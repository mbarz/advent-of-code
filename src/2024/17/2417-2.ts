const program = [2, 4, 1, 3, 7, 5, 1, 5, 0, 3, 4, 3, 5, 5, 3, 0];

function run(A: number): number[] {
  let ptr = 0;
  let B = 0;
  let C = 0;
  const result: number[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let ins: number, op: number;
    if (ptr >= program.length) return result;
    try {
      ins = program[ptr];
      op = program[ptr + 1];
    } catch {
      return result;
    }

    const combo = [0, 1, 2, 3, A, B, C][op];

    switch (ins) {
      case 0:
        A >>= combo;
        break;
      case 1:
        B = (B ^ op) >>> 0;
        break;
      case 2:
        B = combo % 8;
        break;
      case 3:
        if (A) ptr = op - 2;
        break;
      case 4:
        B = (B ^ C) >>> 0;
        break;
      case 5:
        result.push(combo % 8);
        break;
      case 6:
        B = A >> combo;
        break;
      case 7:
        C = A >> combo;
        break;
    }
    ptr += 2;
  }
}

// Part 1
console.log(run(47006051).join(','));

// Part 2
function findMid(): number {
  let mid = 10;
  while (run(mid).length !== program.length) {
    mid *= 10;
  }
  mid *= 10;
  let width = mid;
  let spacing = Math.floor(width / 100);
  for (
    let matchingDigits = 1;
    matchingDigits <= program.length;
    matchingDigits++
  ) {
    mid = (() => {
      for (let A = mid - width; A < mid + width; A += spacing) {
        const res = run(A);
        if (
          res.length === program.length &&
          res.slice(-matchingDigits).toString() ===
            program.slice(-matchingDigits).toString()
        ) {
          return A;
        }
      }
      return mid;
    })();
    spacing = Math.max(1, Math.floor(spacing / 10));
    width = Math.max(100000, Math.floor(width / 10));
  }
  return mid;
}

console.log(findMid());
