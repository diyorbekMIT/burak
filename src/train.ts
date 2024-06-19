

function findLongestWord(text: string): string {
    const words: string[] = text.split(" ");
    
    let maxAmount = 0;
    let longestWord = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxAmount) {
            maxAmount = words[i].length;
            longestWord = words[i];
        }
    }

    return longestWord;
}

console.log(findLongestWord("I love Uzbekistan"));
