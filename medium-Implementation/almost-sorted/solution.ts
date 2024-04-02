'use strict';

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


function almostSorted(arr: number[]): void {
    const n = arr.length;
    let left = -1, right = -1;

    let sorted = true;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            sorted = false;
            break;
        }
    }
    if (sorted) {
        console.log('yes');
        return;
    }

    // Find the first element from the left that is out of order
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            left = i;
            break;
        }
    }

    // Find the first element from the right that is out of order
    for (let i = n - 1; i > 0; i--) {
        if (arr[i] < arr[i - 1]) {
            right = i;
            break;
        }
    }

    // Check if swapping would sort the array
    [arr[left], arr[right]] = [arr[right], arr[left]];

    sorted = true;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            sorted = false;
            break;
        }
    }

    if (sorted) {
        console.log('yes');
        console.log('swap', left + 1, right + 1);
        return;
    }

    // If swapping doesn't work, try reversing a subarray
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    let subArray = arr.slice(left, right + 1).reverse();
    let newArr = [...arr.slice(0, left), ...subArray, ...arr.slice(right + 1)];

    sorted = true;
    for (let i = 0; i < n - 1; i++) {
        if (newArr[i] > newArr[i + 1]) {
            sorted = false;
            break;
        }
    }

    if (sorted) {
        console.log('yes');
        console.log('reverse', left + 1, right + 1);
        return;
    }

    // If neither swapping nor reversing works, the array can't be sorted
    console.log('no');
}


function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
