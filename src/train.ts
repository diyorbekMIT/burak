function sumOfUnique(nums: number[]): number {
  const frequencyMap = new Map<number, number>();

  
  nums.forEach(num => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  let sum = 0;
  frequencyMap.forEach((count, num) => {
    if (count === 1) {
      sum += num;
    }
  });

  return sum;
}
console.log(sumOfUnique([1, 2, 3, 2])); 
