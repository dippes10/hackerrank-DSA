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

function dayOfProgrammer(year: number): string {
    let date;
    
    if (year === 1918) {
        date = "26.09.1918";
    } else if ((year < 1918 && year % 4 === 0) || 
               (year > 1918 && ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)))) {
        date = "12.09." + year;
    } else {
        // Non-leap year
        date = "13.09." + year;
    }
    
    return date;
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const year: number = parseInt(readLine().trim(), 10);

    const result: string = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
