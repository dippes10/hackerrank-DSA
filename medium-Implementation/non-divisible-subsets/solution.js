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

function nonDivisibleSubset(k, s) {
    const remainders = new Array(k).fill(0);

    for (let i = 0; i < s.length; i++) {
        remainders[s[i] % k]++;
    }

    let maxSize = Math.min(remainders[0], 1);

    for (let i = 1; i <= Math.floor(k / 2); i++) {
        if (i !== k - i) {
            maxSize += Math.max(remainders[i], remainders[k - i]);
        } else {
            maxSize += Math.min(remainders[i], 1);
        }
    }

    return maxSize;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
