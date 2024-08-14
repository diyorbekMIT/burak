function delayHelloWorld(message: string, delay: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve(message);
        }, delay);
    });
}

delayHelloWorld("Hello World", 3000).then((result) => {
    console.log(`Returned message: ${result}`);
});
