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

function chocolateInBox(arr) {
    let xorSum = 0;
    for (let i = 0; i < arr.length; i++) {
        xorSum ^= arr[i];
    }
    
    let waysToWin = 0;
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i] ^ xorSum) < arr[i]) {
            waysToWin++;
        }
    }
    
    return waysToWin;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = chocolateInBox(arr);

    ws.write(result + '\n');

    ws.end();
}
