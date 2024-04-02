'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

function extraLongFactorials(n: number): void {
    const factorial = (num: number, memo: Map<number, bigint> = new Map()): bigint => {
        if (memo.has(num)) {
            return memo.get(num)!;
        }
        if (num <= 1) {
            return BigInt(1);
        }
        const result = BigInt(num) * factorial(num - 1, memo);
        memo.set(num, result);
        return result;
    };

    console.log(factorial(n).toString());
}


function main() {
    const n: number = parseInt(readLine().trim(), 10);

    extraLongFactorials(n);
}
