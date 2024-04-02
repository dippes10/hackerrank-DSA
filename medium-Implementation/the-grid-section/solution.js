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

function gridSearch(G, P){
    const R = G.length; 
    const C = G[0].length; 
    const r = P.length;
    const c = P[0].length; 

    for (let i = 0; i <= R - r; i++) {
        for (let j = 0; j <= C - c; j++) {
            let found = true;
      
            for (let k = 0; k < r; k++) {
                for (let l = 0; l < c; l++) {
                    if (G[i + k][j + l] !== P[k][l]) {
                        found = false;
                        break;
                    }
                }
                if (!found) break;
            }
            if (found) return 'YES';
        }
    }
    return 'NO'; 
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const R = parseInt(firstMultipleInput[0], 10);

        const C = parseInt(firstMultipleInput[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const r = parseInt(secondMultipleInput[0], 10);

        const c = parseInt(secondMultipleInput[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        const result = gridSearch(G, P);

        ws.write(result + '\n');
    }

    ws.end();
}
