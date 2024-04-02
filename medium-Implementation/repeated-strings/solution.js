'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function repeatedString(s, n) {
    const countInS = s.split('').filter(char => char === 'a').length;
    const repeatCount = Math.floor(n / s.length);
    const remainingLength = n % s.length;

    // Count 'a' characters in the whole string and the remaining substring
    const totalCount = countInS * repeatCount + s.slice(0, remainingLength).split('').filter
    (char => char === 'a').length;

    return totalCount;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine().trim(), 10);

    const result = repeatedString(s, n);

    ws.write(result + '\n');

    ws.end();
}
