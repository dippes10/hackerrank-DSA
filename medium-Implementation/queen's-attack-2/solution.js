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

/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  let squaresAttacked = 0;
  const obstaclesSet = new Set(obstacles.map(([r, c]) => `${r}-${c}`));

  for (const [dr, dc] of directions) {
    let r = r_q + dr;
    let c = c_q + dc;

    while (
      r >= 1 &&
      r <= n &&
      c >= 1 &&
      c <= n &&
      !obstaclesSet.has(`${r}-${c}`)
    ) {
      squaresAttacked++;
      r += dr;
      c += dc;
    }
  }

  return squaresAttacked;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const secondMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const r_q = parseInt(secondMultipleInput[0], 10);

  const c_q = parseInt(secondMultipleInput[1], 10);

  let obstacles = Array(k);

  for (let i = 0; i < k; i++) {
    obstacles[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((obstaclesTemp) => parseInt(obstaclesTemp, 10));
  }

  const result = queensAttack(n, k, r_q, c_q, obstacles);

  ws.write(result + "\n");

  ws.end();
}
