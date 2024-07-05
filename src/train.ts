function hasProperty(obj: { [key: string]: any }, property: string): boolean {
   return property in obj;
}


console.log(hasProperty({ name: "BMW", model: "M3" }, "model"));
