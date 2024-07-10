function missingNumber(nums: number[]): number {
   const n = nums.length;
   const expectedSum = (n * (n + 1)) / 2;
   const actualSum = nums.reduce((acc, num) => acc + num, 0);
   return expectedSum - actualSum;
 }
 

 console.log(missingNumber([3, 0, 1]));
 