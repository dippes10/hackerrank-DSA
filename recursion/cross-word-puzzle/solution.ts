import * as fs from 'fs';

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

function crosswordPuzzle(crossword: string[], words: string): string[] {
    const wordsArray = words.split(';');
    const grid = crossword.map(row => row.split(''));

    const solve = (grid: string[][], words: string[]): string[] | null => {
        if (words.length === 0) return grid.map(row => row.join(''));

        const word = words[0];

        // Check if the word fits horizontally
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10 - word.length + 1; j++) {
                let canPlace = true;
                for (let k = 0; k < word.length; k++) {
                    if (grid[i][j + k] !== '-' && grid[i][j + k] !== word[k]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    const newGrid = JSON.parse(JSON.stringify(grid));
                    for (let k = 0; k < word.length; k++) {
                        newGrid[i][j + k] = word[k];
                    }
                    const remainingWords = words.slice(1);
                    const result = solve(newGrid, remainingWords);
                    if (result) return result;
                }
            }
        }

        // Check if the word fits vertically
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10 - word.length + 1; i++) {
                let canPlace = true;
                for (let k = 0; k < word.length; k++) {
                    if (grid[i + k][j] !== '-' && grid[i + k][j] !== word[k]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    const newGrid = JSON.parse(JSON.stringify(grid));
                    for (let k = 0; k < word.length; k++) {
                        newGrid[i + k][j] = word[k];
                    }
                    const remainingWords = words.slice(1);
                    const result = solve(newGrid, remainingWords);
                    if (result) return result;
                }
            }
        }

        return null;
    };

    return solve(grid, wordsArray) || [];
}

function main() {
    const ws: fs.WriteStream = fs.createWriteStream(process.env['OUTPUT_PATH']);

    let crossword: string[] = [];

    for (let i: number = 0; i < 10; i++) {
        const crosswordItem: string = readLine();
        crossword.push(crosswordItem);
    }

    const words: string = readLine();

    const result: string[] = crosswordPuzzle(crossword, words);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
