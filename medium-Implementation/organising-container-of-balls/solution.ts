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

function organizingContainers(container: number[][]): string {
    const containerSizes = new Array(container.length).fill(0);
    const ballCounts = new Array(container.length).fill(0);

    for (let i = 0; i < container.length; i++) {
        for (let j = 0; j < container[i].length; j++) {
            containerSizes[i] += container[i][j];
            ballCounts[j] += container[i][j];
        }
    }
    
    containerSizes.sort((a, b) => a - b);
    ballCounts.sort((a, b) => a - b);

    if (containerSizes.join() === ballCounts.join()) {
        return "Possible";
    } else {
        return "Impossible";
    }
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        let container: number[][] = Array(n);

        for (let i: number = 0; i < n; i++) {
            container[i] = readLine().replace(/\s+$/g, '').split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        const result: string = organizingContainers(container);

        ws.write(result + '\n');
    }

    ws.end();
}
