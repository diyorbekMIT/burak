function findDuplicates(arr: number[]): number[] {
  
  const countMap = new Map<number, number>();
  const result: number[] = [];

  for (const num of arr) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  for (const [key, value] of countMap) {
    if (value === 2) {
      result.push(key);
    }
  }

  return result;
}


console.log(findDuplicates([1, 2, 3,2, 4, 5, 4, 3, 4])); 
