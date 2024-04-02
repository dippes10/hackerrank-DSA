'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function crosswordPuzzle(crossword, words) {
    const wordsArray = words.split(';');
    const grid = crossword.map(row => row.split(''));

    const solve = (grid, words) => {
        if (words.length === 0) return grid.map(row => row.join(''));

        const word = words[0];
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

    return solve(grid, wordsArray);
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let crossword = [];

    for (let i = 0; i < 10; i++) {
        const crosswordItem = readLine();
        crossword.push(crosswordItem);
    }

    const words = readLine();

    const result = crosswordPuzzle(crossword, words);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
