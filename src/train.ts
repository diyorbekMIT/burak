function reverseSentence(sentence: string): string {
    let words = sentence.split(' ');

    
    let reversedWords = words.map(word => {
        return word.split('').reverse().join('');
    });

   
    return reversedWords.join(' ');
}



const reversedSentence = reverseSentence("we like coding");
console.log(reversedSentence);
