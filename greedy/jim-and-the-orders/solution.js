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

function jimOrders(orders) {
    const serveTimes = orders.map(([orderNumber, prepTime], index) => [index + 1, orderNumber + prepTime]);

    serveTimes.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    const result = serveTimes.map(customer => customer[0]);
    return result;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let orders = Array(n);

    for (let i = 0; i < n; i++) {
        orders[i] = readLine().replace(/\s+$/g, '').split(' ').map(ordersTemp => parseInt(ordersTemp, 10));
    }

    const result = jimOrders(orders);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
