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

function birthdayCakeCandles(candles: number[]): number {
  const maxHeight: number = Math.max(...candles);
  const maxCount: number = candles.filter((height) => height === maxHeight).length;

  return maxCount;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const candlesCount: number = parseInt(readLine().trim(), 10);

  const candles: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((candlesTemp) => parseInt(candlesTemp, 10));

  const result: number = birthdayCakeCandles(candles);

  ws.write(result + "\n");

  ws.end();
}
