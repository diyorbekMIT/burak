function countChars(str: string): { [key: string]: number } {
  const charCount: { [key: string]: number } = {};

  for (let char of str) {
      if (charCount[char]) {
          charCount[char]++;
      } else {
          charCount[char] = 1;
      }
  }

  return charCount;
}


console.log(countChars("hello"));
