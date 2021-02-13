export const forEachPosition = (doThis) => {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      doThis(x, y);
    }
  }
};
