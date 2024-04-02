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

function organizingContainers(container) {
    const containerSizes = new Array(container.length).fill(0);
    const ballCounts = new Array(container.length).fill(0);

    for (let i = 0; i < container.length; i++) {
        for (let j = 0; j < container[i].length; j++) {
            containerSizes[i] += container[i][j];
            ballCounts[j] += container[i][j];
        }
    }
    
    containerSizes.sort((a, b) => a - b);
    ballCounts.sort((a, b) => a - b);

    if (containerSizes.join() === ballCounts.join()) {
        return "Possible";
    } else {
        return "Impossible";
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().replace(/\s+$/g, '').split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        const result = organizingContainers(container);

        ws.write(result + '\n');
    }

    ws.end();
}
