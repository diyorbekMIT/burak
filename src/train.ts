function reverseInteger(num: number): number {

  let reversedString = num.toString().split('').reverse().join('');

  let reversedNumber = parseInt(reversedString, 10);
  
  return reversedNumber;
}


console.log(reverseInteger(123456789)); 
