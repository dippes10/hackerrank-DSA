'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}


function jimOrders(orders: number[][]): number[] {
    const serveTimes = orders.map(([orderNumber, prepTime], index) => [index + 1, orderNumber + prepTime]);

    serveTimes.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    const result = serveTimes.map(customer => customer[0]);
    return result;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    let orders: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        orders[i] = readLine().replace(/\s+$/g, '').split(' ').map(ordersTemp => parseInt(ordersTemp, 10));
    }

    const result: number[] = jimOrders(orders);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
