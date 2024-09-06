function countNumberAndLetters(input: string): { number: number; letter: number } {
  
  let numberCount = 0;
  let letterCount = 0;

  
  for (const char of input) {
    if (/[0-9]/.test(char)) {
      numberCount++;
    }
    else if (/[a-zA-Z]/.test(char)) {
      letterCount++;
    }
  }
  return { number: numberCount, letter: letterCount };
}

const result = countNumberAndLetters("string152%\\¥");
console.log(result); 
