const countVowels = (input: string): number => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    for (let char of input.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
};


const result = countVowels("string");
console.log(result); 
