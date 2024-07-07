function calculate(expression: string): number {
   const result = eval(expression);
   return result;
}

console.log(calculate("1 + 3"));  