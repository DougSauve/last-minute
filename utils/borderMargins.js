const getSmallestDimensionOfViewport = () => {
  let smallestDimensionOfViewport = window.innerHeight;

  if (window.innerHeight > window.innerWidth) {
    smallestDimensionOfViewport = window.innerWidth;
  }

  return smallestDimensionOfViewport;
}

//These two methods are used to create margins of equal width based on the smallest dimension of the viewport.
const setBorderMarginHeight = (marginSize) => {
  const smallestDimensionOfViewport = getSmallestDimensionOfViewport();
  const num = Math.floor(window.innerHeight - ((smallestDimensionOfViewport * marginSize) / 100));
  return num + "px";
}

const setBorderMarginWidth = (marginSize) => {
  const smallestDimensionOfViewport = getSmallestDimensionOfViewport();
  const num = Math.floor(window.innerWidth - ((smallestDimensionOfViewport * marginSize) / 100));
  return num + "px";
}

export {
  setBorderMarginHeight,
  setBorderMarginWidth
};
