function printNumbers() {
  let counter = 0;
  const intervalId = setInterval(() => {
    
    console.log((counter % 5) + 1);
    counter++;
  }, 1000); 


  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000); 
}


printNumbers();
