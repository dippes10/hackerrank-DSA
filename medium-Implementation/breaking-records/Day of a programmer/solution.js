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

function dayOfProgrammer(year) {
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
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
