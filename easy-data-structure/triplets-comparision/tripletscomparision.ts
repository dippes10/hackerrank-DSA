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

function compare(a: number, b: number): number {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else return 0;
}

function compareTriplets(a: number[], b: number[]): number[] {
  let Alice = 0;
  let Bob = 0;

  for (let i = 0; i < a.length; i++) {
    const result = compare(a[i], b[i]);

    if (result === 1) {
      Alice++;
    } else if (result === -1) {
      Bob++;
    }
  }
  return [Alice, Bob];
}

function main() {
  // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const a: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((aTemp) => parseInt(aTemp, 10));

  const b: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((bTemp) => parseInt(bTemp, 10));

  const result: number[] = compareTriplets(a, b);

  // ws.write(result.join(' ') + '\n');
  // ws.end();
  console.log(result);
}
