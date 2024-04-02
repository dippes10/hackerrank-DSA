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

function gradingStudents(grades: number[]): number[] {
    const roundedGrades: number[] = [];

    for (let grade of grades) {
        if (grade < 38) {
            roundedGrades.push(grade);
        } else {
            const nextMultipleOf5: number = Math.ceil(grade / 5) * 5;
            if (nextMultipleOf5 - grade < 3) {
                roundedGrades.push(nextMultipleOf5);
            } else {
                roundedGrades.push(grade);
            }
        }
    }

    return roundedGrades;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const gradesCount: number = parseInt(readLine().trim(), 10);

    let grades: number[] = [];

    for (let i: number = 0; i < gradesCount; i++) {
        const gradesItem: number = parseInt(readLine().trim(), 10);

        grades.push(gradesItem);
    }

    const result: number[] = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
