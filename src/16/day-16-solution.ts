import { ValveSolver } from './day-16';

function alone() {
  const s = new ValveSolver('puzzle');
  console.time('solve alone');
  const alone = s.solveStepByStep('AA', [], 30, 0);
  console.timeEnd('solve alone');
  console.log(alone, 'VS', 1716);
}

function withEle() {
  const s = new ValveSolver('puzzle');
  console.time('solve with elephant');
  s.cache.clear();
  const withHelp = s.solveStepByStep('AA', [], 26, 1);
  console.timeEnd('solve with elephant');
  console.log(withHelp);
}

alone();
withEle();

// not 2345

//1716
