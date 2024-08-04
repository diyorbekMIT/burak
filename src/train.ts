function removeDuplicate(input: string): string {
    let uniqueChars = new Set<string>();
    for (let char of input) {
        uniqueChars.add(char);
    }
    return Array.from(uniqueChars).join('');
}

console.log( removeDuplicate('stringg')); 
