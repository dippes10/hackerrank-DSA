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

function climbingLeaderboard(ranked, player) {
    const uniqueRankedScores = [...new Set(ranked)]; 
    const result = [];

    let j = uniqueRankedScores.length - 1;

    for (let i = 0; i < player.length; i++) {
        while (j >= 0) {
            if (player[i] >= uniqueRankedScores[j]) {
                j--;
            } else {
                result.push(j + 2); 
                break;
            }
        }
        if (j < 0) { 
            result.push(1); 
        }
    }

    return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const rankedCount: number = parseInt(readLine().trim(), 10);

    const ranked: number[] = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount: number = parseInt(readLine().trim(), 10);

    const player: number[] = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result: number[] = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
