function singleNumber(nums: number[]): number {
  return nums.reduce((acc, num) => acc ^ num, 0);
}
console.log(singleNumber([4, 2, 1, 2, 1])); 
