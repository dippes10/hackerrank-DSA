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

function compare(a, b) {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else return 0;
}

function compareTriplets(a, b) {
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
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const a = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((aTemp) => parseInt(aTemp, 10));

  const b = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((bTemp) => parseInt(bTemp, 10));

  const result = compareTriplets(a, b);

  ws.write(result.join(" ") + "\n");

  ws.end();
}
