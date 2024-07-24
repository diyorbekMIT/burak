function findIntersection(arr1: number[], arr2: number[]): number[] {
    return arr1.filter(value => arr2.includes(value));
}

console.log(findIntersection([1,2,3], [3,2,0]))