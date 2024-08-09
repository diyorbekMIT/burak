function convertToSnakeCase(str: string): string {
    return str
        .toLowerCase()
        .replace(/\s+/g, '_');
}

const result = convertToSnakeCase('name should be a string');
console.log(result);
