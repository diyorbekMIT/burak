function majorityElement(nums: number[]): number {
    let frequency: { [key: string]: number } = {};
    
    for (let num of nums) {
        if (frequency[num]) {
            frequency[num]++;
        } else {
            frequency[num] = 1;
        }
    }
    
    let maxElement: string = nums[0].toString();
    let maxCount: number = 1;
    
    for (let num in frequency) {
        if (frequency[num] > maxCount) {
            maxElement = num;
            maxCount = frequency[num];
        }
    }
    
    return parseInt(maxElement);
}

console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); // Output: 4
