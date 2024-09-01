function areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
  
    const countElements = (arr: number[]) => {
      const countMap = new Map<number, number>();
      for (const num of arr) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
      }
      return countMap;
    };
  
    const countMap1 = countElements(arr1);
    const countMap2 = countElements(arr2);
  
    if (countMap1.size !== countMap2.size) return false;
  
    for (const [key, value] of countMap1) {
      if (countMap2.get(key) !== value) {
        return false;
      }
    }
  
    return true;
  }
  
  console.log(areArraysEqual([1, 2, 3], [3, 1, 2])); 
  console.log(areArraysEqual([1, 2, 3], [3, 1, 2, 1])); 
  console.log(areArraysEqual([1, 2, 3], [4, 1, 2])); 
  