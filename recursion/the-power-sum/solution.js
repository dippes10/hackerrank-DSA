"use strict";

const fs = require("fs");

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

function powerSum(X, N, num = 1) {
  const power = Math.pow(num, N);

  if (power > X) return 0;
  if (power === X) return 1;

  return powerSum(X - power, N, num + 1) + powerSum(X, N, num + 1);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const X = parseInt(readLine().trim(), 10);

  const N = parseInt(readLine().trim(), 10);

  const result = powerSum(X, N);

  ws.write(result + "\n");

  ws.end();
}
