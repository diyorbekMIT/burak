function findDisappearedNumbers(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = [];

    const numSet = new Set<number>(nums);

    for (let i = 1; i <= n; i++) {

        if (!numSet.has(i)) {
            result.push(i);
        }
    }

    return result;
}
const nums = [1, 3, 4, 7];
console.log(findDisappearedNumbers(nums)); 