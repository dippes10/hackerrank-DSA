"use strict";

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

function miniMaxSum(arr: number[]): void {
  const totalSum: number = arr.reduce(
    (sum: number, num1: number) => sum + num1,
    0
  );
  const maxNum: number = Math.max(...arr);
  const minNum: number = Math.min(...arr);

  console.log(totalSum - maxNum, totalSum - minNum);
}

function main() {
  const arr: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  miniMaxSum(arr);
}
