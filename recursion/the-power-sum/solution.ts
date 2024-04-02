'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function (inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function (): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

function powerSum(X: number, N: number, num: number = 1): number {
    const power = Math.pow(num, N);

    if (power > X) return 0;
    if (power === X) return 1;

    return powerSum(X - power, N, num + 1) + powerSum(X, N, num + 1);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const X: number = parseInt(readLine().trim(), 10);

    const N: number = parseInt(readLine().trim(), 10);

    const result: number = powerSum(X, N);

    ws.write(result + '\n');

    ws.end();
}
