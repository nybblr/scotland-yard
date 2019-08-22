/* Key
  T => Taxi
  B => Bus
  U => Underground
  F => Ferry
*/

/* Incomplete map of London,
   add all of them to play! */
let compactMap = [
  '22>TB>34',
  '22>TB>23',
  '22>T>11',
  '23>TB>13',
  '13>U>46',
];

let parseEdge = (edge) => {
  let [a, ts, b] = edge.split('>');
  return [a, ts.split(''), b]
};

import { mapValues } from './util.js';

/* Routes are reflexive,
   and each mode of transit
   counts as an independent action */
let expandMap = (compact) => {
  let map = {};
  let insert = (a, t, b) => {
    let trans = map[a] = map[a] || {};
    let dests = trans[t] = trans[t] || new Set();
    dests.add(b);
  };
  compact
    .map(parseEdge)
    .forEach(([a, ts, b]) =>
      ts.map(t => {
        insert(a, t, b);
        insert(b, t, a);
      })
    );
  // Turn Sets into arrays
  return mapValues(map, ts =>
    mapValues(ts, bs => [...bs])
  );
};

let map = expandMap(compactMap);
// console.log(map);

/*
  crookBeliefStates = { '13': 1 };
  detectiveStates = {
    Red: '15',
    Green: '18',
    Yellow: '54',
    Blue: '113',
  };
  transit = 'T';
*/
export let nextBeliefStates = (
  crookBeliefStates,
  detectiveStates,
  transit
) => {
  /* A crook can take any action
     so long as it doesn't
     land on a detective */
  let beliefStates = {};

  let addBelief = (b, p) => {
    beliefStates[b] = (beliefStates[b] || 0) + p;
  };
  let isDetectiveAt = (b) =>
    Object.entries(detectiveStates).some(
      ([_, position]) => position === b
    );

  Object.entries(crookBeliefStates).forEach(([a, p]) =>
    Object.entries(map[a]).forEach(([t, bs]) =>
      /* If transit is known,
         ignore any other transits */
      !(transit && transit !== t) && bs.forEach(b =>
        !isDetectiveAt(b) && addBelief(b, p)
      )
    )
  );
  return normalizeBeliefStates(beliefStates);
};

export let normalizeBeliefStates = (beliefStates) => {
  let total = Object.entries(beliefStates)
    .reduce((sum, [_, p]) => sum + p, 0);
  return mapValues(beliefStates, p => p / total);
};
