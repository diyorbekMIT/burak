function calculateSumOfNumbers(input: any[]): Number {
   let sum = 0;
   const result = input.map((ele) =>{
      if (typeof ele === "number") {
         sum += ele;
      }
   });
   return sum;
};

console.log(calculateSumOfNumbers([10, "10", {son: 10}, true, 35]))
