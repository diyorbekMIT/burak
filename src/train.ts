function getDigits (input: string) {
    const numbers: string[] = ["0","2","3","4","5","6","7","8","9"];
    const arr: number[] = input.split("").filter(char => numbers.includes(char)).map(char => parseInt(char));
    return arr;
    
};

console.log(getDigits("MIT14"));