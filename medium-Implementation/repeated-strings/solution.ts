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



function repeatedString(s: string, n: number): number {
    const countInS = s.split('').filter(char => char === 'a').length;
    const repeatCount = Math.floor(n / s.length);
    const remainingLength = n % s.length;

    // Count 'a' characters in the whole string and the remaining substring
    const totalCount = countInS * repeatCount + s.slice(0, remainingLength).split('').filter
        (char => char === 'a').length;

    return totalCount;
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const n: number = parseInt(readLine().trim(), 10);

    const result: number = repeatedString(s, n);

    ws.write(result + '\n');

    ws.end();
}
