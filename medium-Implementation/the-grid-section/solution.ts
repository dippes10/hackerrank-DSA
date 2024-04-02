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

function gridSearch(G: string[], P: string[]): string {
    const R = G.length; 
    const C = G[0].length; 
    const r = P.length; 
    const c = P[0].length; 

    for (let i = 0; i <= R - r; i++) {
        for (let j = 0; j <= C - c; j++) {
            let found = true;
            for (let k = 0; k < r; k++) {
                for (let l = 0; l < c; l++) {
                    if (G[i + k][j + l] !== P[k][l]) {
                        found = false;
                        break;
                    }
                }
                if (!found) break;
            }
            if (found) return 'YES'; 
        }
    }
    return 'NO'; 
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const R: number = parseInt(firstMultipleInput[0], 10);

        const C: number = parseInt(firstMultipleInput[1], 10);

        let G: string[] = [];

        for (let i: number = 0; i < R; i++) {
            const GItem: string = readLine();
            G.push(GItem);
        }

        const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const r: number = parseInt(secondMultipleInput[0], 10);

        const c: number = parseInt(secondMultipleInput[1], 10);

        let P: string[] = [];

        for (let i: number = 0; i < r; i++) {
            const PItem: string = readLine();
            P.push(PItem);
        }

        const result: string = gridSearch(G, P);

        ws.write(result + '\n');
    }

    ws.end();
}
