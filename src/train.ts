function changeNumberInArray(indexToChange: number, array: number[], newNumber: number): number[] {

    let newArray = [...array];


    if (indexToChange >= 0 && indexToChange < newArray.length) {
        newArray[indexToChange] = newNumber;
    }

    return newArray;
}


let result = changeNumberInArray(1, [1, 3, 7, 2], 2);
console.log(result);  
