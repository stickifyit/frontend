import { SheetItem } from "@/store/customSheet";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type PlacedElement = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: string | StaticImport;
    fileType: "upload" | "url";
    file: File;
};

function fitContainer(cWidth: number, cHeight: number, buckets: SheetItem[], margin: number) {
    const sortedBuckets = buckets.sort((a, b) => b.size - a.size);
    const containerWidth = cWidth - 2 * margin;
    const containerHeight = cHeight - 2 * margin;
    const container = initializeContainer(containerWidth, containerHeight);
    const placedElements: PlacedElement[] = [];

    // Calculate the number of stickers that can fit horizontally
    const stickersPerRow = Math.floor(containerWidth / (sortedBuckets[0].size + margin));

    addElement(0, 0, container, sortedBuckets, 0, placedElements, margin, stickersPerRow);

    return placedElements;
}


function initializeContainer(cWidth: number, cHeight: number) {
    return Array.from({ length: cHeight }, () => Array(Math.round(cWidth)).fill("⬛"));
}

function addElement(x: number, y: number, container: any, buckets: SheetItem[], i: number, placedElements: PlacedElement[], margin: number, stickersPerRow: number) {
    if (i === buckets.length) {
        const size = buckets[i - 1].size; // Use the size of the previously placed bucket
        const roundedX = Math.round(x);
        const roundedY = Math.round(y);

        placedElements.push({
            x: roundedX,
            y: roundedY,
            width: size,
            height: size,
            image: buckets[i - 1].image,
            id: buckets[i - 1].id,
            fileType: buckets[i - 1].fileType,
            file: buckets[i - 1].file as File,
        });
        return;
    }

    const size = buckets[i].size;

    for (let loopY = 0; loopY < size; loopY++) {
        for (let loopX = 0; loopX < size; loopX++) {
            if (container[loopY + y] && container[loopY + y][loopX + x]) {
                container[loopY + y][loopX + x] = buckets[i].image;
            }
        }
    }

    placedElements.push({
        x,
        y,
        width: size,
        height: size,
        image: buckets[i].image,
        id: buckets[i].id,
        fileType: buckets[i].fileType,
        file: buckets[i].file as File,
    });

    const nextIndex = i + 1;

    if (nextIndex < buckets.length) {
        const nextSize = buckets[nextIndex].size;

        for (let newY = 0; newY <= container.length - nextSize; newY++) {
            for (let newX = 0; newX <= container[0].length - nextSize; newX++) {
                const canPlace = checkPlacement(container, newX, newY, nextSize);
                if (canPlace) {
                    addElement(newX, newY, container, buckets, nextIndex, placedElements, margin, stickersPerRow);
                    return;
                }
            }
        }
    }
}

function checkPlacement(container: any, x: number, y: number, size: number) {
    for (let checkY = 0; checkY < size; checkY++) {
        for (let checkX = 0; checkX < size; checkX++) {
            if (container[y + checkY] && container[y + checkY][x + checkX] !== "⬛") {
                return false;
            }
        }
    }
    return true;
}

export default fitContainer;
