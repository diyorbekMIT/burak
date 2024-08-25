function rotateArray(arr: number[], index: number): number[] {
  
  if (index < 0 || index > arr.length) {
      throw new Error("Index out of bounds");
  }
  
  
  const part1 = arr.slice(0, index);
  const part2 = arr.slice(index);
  
  
  return part2.concat(part1);
}


const result = rotateArray([1, 2, 3, 4, 5, 6], 3);
console.log(result); 
