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

function staircase(n: number): void {
  let i: number = 1;
  let j: number = 1;
  let k: number = 1;

  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n - i; j++) {
      process.stdout.write(" ");
    }

    for (k = 1; k <= i; k++) {
      process.stdout.write("#");
    }
    console.log();
  }
}

function main() {
  const n: number = parseInt(readLine().trim(), 10);

  staircase(n);
}
