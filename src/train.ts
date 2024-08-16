function reduceNestedArray(arr: any[]): number {
    return arr.reduce((sum: number, current: any) => {
        if (Array.isArray(current)) {
            return sum + reduceNestedArray(current); 
        } else if (typeof current === 'number') {
            return sum + current;
        } else {
            
            return sum;
        }
    }, 0);
}

const result = reduceNestedArray([1, [1, 2, [4]]]);
console.log(result);
