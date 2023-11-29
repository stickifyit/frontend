// Import necessary types
import { SheetItem } from "@/store/customSheet";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Define the PlacedElement type
export type PlacedElement = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    image: string | StaticImport,
    fileType: "upload" | "url",
    file: File
};

// Main function to fit elements into a container
function fitContainer(cWidth: number, cHeight: number, buckets: SheetItem[]) {
    // Sort buckets by size in descending order
    const sortedBuckets = buckets.sort((a, b) => b.size - a.size);
    // Initialize the container with black squares ('⬛')
    const container = initializeContainer(cWidth, cHeight);
    // Array to store placed elements
    const placedElements: PlacedElement[] = [];

    // Start placing elements
    addElement(0, 0, container, sortedBuckets, 0, placedElements);

    // Return the array of placed elements
    return placedElements;
}

// Function to initialize the container with black squares
function initializeContainer(cWidth: number, cHeight: number) {
    return Array.from({ length: cHeight }, () => Array(Math.round(cWidth)).fill("⬛"));
}

// Recursive function to add an element to the container
function addElement(x: number, y: number, container: any, buckets: SheetItem[], i: number, placedElements: PlacedElement[]) {
    // If all elements are placed, return
    if (i === buckets.length) {
        placedElements.push({
            x: Math.round(x),
            y: Math.round(y),
            width: buckets[i].size,
            height: buckets[i].size,
            image: buckets[i].image,
            id: buckets[i].id,
            fileType: buckets[i].fileType,
            file: buckets[i].file as File
        });
        return;
    }

    const size = buckets[i].size;

    // Place the element in the container
    for (let loopY = 0; loopY < size; loopY++) {
        for (let loopX = 0; loopX < size; loopX++) {
            if (container[loopY + y] && container[loopY + y][loopX + x]) {
                container[loopY + y][loopX + x] = buckets[i].image;
            }
        }
    }

    // Record the placed element
    placedElements.push({
        x,
        y,
        width: size,
        height: size,
        image: buckets[i].image,
        id: buckets[i].id,
        fileType: buckets[i].fileType,
        file: buckets[i].file as File
    });

    const nextIndex = i + 1;

    // If there are more elements, recursively try to add the next element
    if (nextIndex < buckets.length) {
        const nextSize = buckets[nextIndex].size;

        for (let newY = 0; newY <= container.length - nextSize; newY++) {
            for (let newX = 0; newX <= container[0].length - nextSize; newX++) {
                const canPlace = checkPlacement(container, newX, newY, nextSize);
                if (canPlace) {
                    addElement(newX, newY, container, buckets, nextIndex, placedElements);
                    return;
                }
            }
        }
    }
}

// Function to check if an element can be placed at a specific position
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













// Export the fitContainer function as the default export
export default fitContainer;
