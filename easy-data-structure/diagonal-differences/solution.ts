"use strict";

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

function diagonalDifference(arr: number[][]): number {
  const n = arr.length;
  let i = 0;

  let firstDiagonal = 0;
  let secondDiagonal = 0;

  for (i = 0; i < n; i++) {
    firstDiagonal += arr[i][i];
    secondDiagonal += arr[i][n - 1 - i];
  }

  return Math.abs(firstDiagonal - secondDiagonal);
}

function main() {
  // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const n: number = parseInt(readLine().trim(), 10);

  let arr: number[][] = Array(n);

  for (let i: number = 0; i < n; i++) {
    arr[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));
  }

  const result: number = diagonalDifference(arr);

  // ws.write(result + '\n');

  // ws.end();
  console.log(result);
}
