function capitalizeWords(sentence: string): string {

    const words = sentence.split(' ');

    const capitalizedWords = words.map(word => {
        if (word.length > 2) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    });

    return capitalizedWords.join(' ');
}
const result = capitalizeWords('name should be a string');
console.log(result);  
