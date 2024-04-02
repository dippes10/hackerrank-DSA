'use strict';

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

function countSort(arr) {
    const n = arr.length;
    const max_value = Math.max(...arr.map(item => parseInt(item[0])));
    const count = Array.from({ length: max_value + 1 }, () => []);

    for (let i = 0; i < n; i++) {
        const value = parseInt(arr[i][0]);
        let str = arr[i][1];

        if (i < n / 2) {
            str = "-";
        }
        count[value].push(str);
    }
    
        for (let i = 0; i <= max_value; i++) {
            for (const s of count[i]) {
                process.stdout.write(s + " ");
            }
        }
    }


function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
