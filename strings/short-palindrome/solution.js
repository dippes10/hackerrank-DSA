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

function shortPalindrome(s) {
    const MOD = 1000000007;
    let firstCount = Array(26).fill(0);
    let secondCount = Array(26).fill(0).map(() => Array(26).fill(0));
    let thirdCount = Array(26).fill(0);
    let totalCount = 0;

    for (const ch of s) {
        const index = ch.charCodeAt(0) - 'a'.charCodeAt(0);

        totalCount = (totalCount + thirdCount[index]) % MOD;

        for (let i = 0; i < 26; i++) {
            thirdCount[i] = (thirdCount[i] + secondCount[i][index]) % MOD;
        }

        for (let i = 0; i < 26; i++) {
            secondCount[i][index] = (secondCount[i][index] + firstCount[i]) % MOD;
        }

        firstCount[index]++;
    }

    return totalCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = shortPalindrome(s);

    ws.write(result + '\n');

    ws.end();
}
