function sumEvens(numbers: number[]): number {
    return numbers.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0);
}


console.log(sumEvens([1, 2, 3])); 
