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

function queensAttack(n: number, r_q: number, c_q: number, obstacles: number[][]): number {

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    let squaresAttacked = 0;

    const obstaclesSet = new Set(obstacles.map(([r, c]) => `${r}-${c}`));

    for (const [dr, dc] of directions) {
        let r = r_q + dr;
        let c = c_q + dc;

        while (r >= 1 && r <= n && c >= 1 && c <= n && !obstaclesSet.has(`${r}-${c}`)) {
            squaresAttacked++;
            r += dr;
            c += dc;
        }
    }
    
    return squaresAttacked;
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const r_q: number = parseInt(secondMultipleInput[0], 10);

    const c_q: number = parseInt(secondMultipleInput[1], 10);

    let obstacles: number[][] = Array(k);

    for (let i: number = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result: number = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
