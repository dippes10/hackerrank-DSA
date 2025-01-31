"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function staircase(n) {
  let i = 1;
  let j = 1;
  let k = 1;

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
  const n = parseInt(readLine().trim(), 10);

  staircase(n);
}
