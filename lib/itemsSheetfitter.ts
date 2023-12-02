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
  item:SheetItem
};

function fitContainer(
  cWidth: number,
  cHeight: number,
  buckets: SheetItem[],

  margin: number
) {
  const sortedBuckets = buckets //.sort((a, b) => b.size - a.size);
  const containerWidth = cWidth - 2 * margin;
  const containerHeight = cHeight - 2 * margin;
  const container = initializeContainer(containerWidth, containerHeight);
  const placedElements: PlacedElement[] = [];

  // Calculate the number of stickers that can fit horizontally
  const stickersPerRow = Math.floor(
    containerWidth / (sortedBuckets[0].width?? 1 + margin)
  );

  addElement(
    0,
    0,
    container,
    sortedBuckets,
    0,
    placedElements,
    margin,
    stickersPerRow
  );

  return placedElements;
}

function initializeContainer(cWidth: number, cHeight: number) {
  return Array.from({ length: cHeight }, () =>
    Array(Math.round(cWidth)).fill("⬛")
  );
}

function addElement(
  x: number,
  y: number,
  container: any,
  buckets: SheetItem[],
  i: number,
  placedElements: PlacedElement[],
  margin: number,
  stickersPerRow: number
) {
  if (i === buckets.length) {
    const width = buckets[i - 1].width?? 1;
    const height = buckets[i - 1].height?? 1;
    const roundedX = Math.round(x);
    const roundedY = Math.round(y);

    placedElements.push({
      x: roundedX,
      y: roundedY,
      width,
      height,
      image: buckets[i - 1].image,
      id: buckets[i - 1].id,
      fileType: buckets[i - 1].fileType,
      file: buckets[i - 1].file as File,
      item: buckets[i - 1]
    });
    return;
  }

  const width = buckets[i].width??1;
  const height = buckets[i].height??1;

  for (let loopY = 0; loopY < height; loopY++) {
    for (let loopX = 0; loopX < width; loopX++) {
      if (container[loopY + y] && container[loopY + y][loopX + x]) {
        container[loopY + y][loopX + x] = buckets[i].image;
      }
    }
  }

  placedElements.push({
    x,
    y,
    width,
    height,
    image: buckets[i].image,
    id: buckets[i].id,
    fileType: buckets[i].fileType,
    file: buckets[i].file as File,
    item: buckets[i]
  });

  const nextIndex = i + 1;

  if (nextIndex < buckets.length) {
    const nextWidth = buckets[nextIndex].width??1;
    const nextHeight = buckets[nextIndex].height??1;

    for (let newY = 0; newY <= container.length - nextHeight; newY++) {
      for (let newX = 0; newX <= container[0].length - nextWidth; newX++) {
        const canPlace = checkPlacement(
          container,
          newX,
          newY,
          nextWidth,
          nextHeight
        );
        if (canPlace) {
          addElement(
            newX,
            newY,
            container,
            buckets,
            nextIndex,
            placedElements,
            margin,
            stickersPerRow
          );
          return;
        }
      }
    }
  }
}

function checkPlacement(
  container: any,
  x: number,
  y: number,
  width: number,
  height: number
) {
  for (let checkY = 0; checkY < height; checkY++) {
    for (let checkX = 0; checkX < width; checkX++) {
      if (container[y + checkY] && container[y + checkY][x + checkX] !== "⬛") {
        return false;
      }
    }
  }
  return true;
}

export default fitContainer;
