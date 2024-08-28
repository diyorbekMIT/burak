function areParenthesesBalanced(input: string): boolean {
  let balance = 0;

  for (let char of input) {
      if (char === "(") {
          balance++;
      } else if (char === ")") {
          balance--;
      }

      
      if (balance < 0) {
          return false;
      }
  }

  
  return balance === 0;
}


console.log(areParenthesesBalanced("string()ichida(qavslar)soni()balansda")); 

