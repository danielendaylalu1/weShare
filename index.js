function uniteUnique(...arr) {
  let newArr = [...arr];
  let original = [];
  for (let items of newArr) {
    for (let item of items) {
      if (!original.includes(item)) {
        original.push(item);
      }
    }
  }
  original = original.sort((a, b) => a - b);
  return original;
}

console.log(uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]));
