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

function highestValuePalindrome(s, n, k) {
    let sArray = s.split('');
    let changes = new Array(n).fill(false);

    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (sArray[i] !== sArray[n - 1 - i]) {
            changes[i] = true;
            changes[n - 1 - i] = true;
            if (sArray[i] > sArray[n - 1 - i]) {
                sArray[n - 1 - i] = sArray[i];
            } else {
                sArray[i] = sArray[n - 1 - i];
            }
            k--;
        }
    }

    if (k < 0) return "-1";

    for (let i = 0; i < Math.floor(n / 2) && k > 0; i++) {
        if (sArray[i] !== '9') {
            if (changes[i] || changes[n - 1 - i]) {
                sArray[i] = '9';
                sArray[n - 1 - i] = '9';
                k--;
            } else if (k >= 2) {
                sArray[i] = '9';
                sArray[n - 1 - i] = '9';
                k -= 2;
            }
        }
    }

    if (n % 2 !== 0 && k > 0) {
        sArray[Math.floor(n / 2)] = '9';
    }

    return sArray.join('');
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine();

    const result = highestValuePalindrome(s, n, k);

    ws.write(result + '\n');

    ws.end();
}
