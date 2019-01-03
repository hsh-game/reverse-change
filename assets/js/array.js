function get2DArray(size, item) {
  size = Number(size);
  return Array(size).map(() => Array(size).fill(item));
}
