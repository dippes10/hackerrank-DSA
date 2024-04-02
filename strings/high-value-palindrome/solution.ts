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

function highestValuePalindrome(s: string, n: number, k: number): string {
    let sArray = s.split('');
    let changes = new Array(n).fill(false);

    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (sArray[i] !== sArray[n - 1 - i]) {
            changes[i] = true;
            changes[n - 1 - i] = true;
            if (sArray[i] > sArray[n - 1 - i]) {
                sArray[n - 1 - i] = sArray[i];
            } else {
                sArray[i] = sArray[n - 1 - i];
            }
            k--;
        }
    }

    if (k < 0) return "-1";

    for (let i = 0; i < Math.floor(n / 2) && k > 0; i++) {
        if (sArray[i] !== '9') {
            if (changes[i] || changes[n - 1 - i]) {
                sArray[i] = '9';
                sArray[n - 1 - i] = '9';
                k--;
            } else if (k >= 2) {
                sArray[i] = '9';
                sArray[n - 1 - i] = '9';
                k -= 2;
            }
        }
    }

    if (n % 2 !== 0 && k > 0) {
        sArray[Math.floor(n / 2)] = '9';
    }

    return sArray.join('');
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const s: string = readLine();

    const result: string = highestValuePalindrome(s, n, k);

    ws.write(result + '\n');

    ws.end();
}
