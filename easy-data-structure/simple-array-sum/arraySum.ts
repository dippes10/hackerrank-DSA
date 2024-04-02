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

function sum(a: number, b: number): number {
  return a + b;
}

function simpleArraySum(ar: number[]): number {
  return ar.reduce(sum, 0);
}

function main() {
  //Commented because of Error in text editor
  // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);
  const arCount: number = parseInt(readLine().trim(), 10);
  const ar: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arTemp) => parseInt(arTemp, 10));
  const result: number = simpleArraySum(ar);
  console.log(result);
  // ws.write(result = '\n');
  // ws.end();
}
