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


function absolutePermutation(n: number, k: number): number[] {
    
  if (k === 0) {
        return Array.from({ length: n }, (_, i) => i + 1);
    }

    if (n % (2 * k) !== 0) {
        return [-1];
    }

    const result = [];
    let toggle = true;

    for (let i = 1; i <= n; i++) {
        if (toggle) {
            result.push(i + k);
        } else {
            result.push(i - k);
        }

        if (i % k === 0) {
            toggle = !toggle;
        }
    }

    return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const n: number = parseInt(firstMultipleInput[0], 10);

        const k: number = parseInt(firstMultipleInput[1], 10);

        const result: number[] = absolutePermutation(n, k);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
