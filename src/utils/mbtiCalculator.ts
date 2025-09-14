import type { Answer, MBTIType } from '../types';

export function calculateMBTI(answers: Answer[]): MBTIType {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  answers.forEach(answer => {
    answer.traits.forEach(trait => {
      scores[trait]++;
    });
  });

  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return type as MBTIType;
}