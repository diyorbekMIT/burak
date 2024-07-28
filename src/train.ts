function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


console.log(randomBetween(30, 50)); 
