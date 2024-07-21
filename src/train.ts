function countOccurrences(obj: any, key: string): number {
    let count = 0;

    function recurse(obj: any): void {
        if (typeof obj === 'object' && obj !== null) {
            for (const k in obj) {
                if (k === key) {
                    count++;
                }
                recurse(obj[k]);
            }
        }
    }

    recurse(obj);
    return count;
}

console.log(countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model'));
