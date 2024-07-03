function objectToArray(obj: { [key: string]: any }): [string, any][] {
   return Object.entries(obj);
}


console.log(objectToArray({a: 10, b: 20}));  
