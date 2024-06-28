function palindromCheck(input: string): boolean {
   if (input.split("").reverse().join("") === input) {
    return true; 
   } else {
    return false;
   }
};
console.log(palindromCheck("dad"));
console.log(palindromCheck("son"));