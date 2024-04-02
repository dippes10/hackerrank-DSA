'use strict';

import { WriteStream, createWriteStream } from "fs";
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


function chocolateInBox(arr: number[]): number {
    let xorSum = 0;
    for (let i = 0; i < arr.length; i++) {
        xorSum ^= arr[i];
    }
    
    let waysToWin = 0;
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i] ^ xorSum) < arr[i]) {
            waysToWin++;
        }
    }
    
    return waysToWin;
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const arrCount: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number = chocolateInBox(arr);

    ws.write(result + '\n');

    ws.end();
}
