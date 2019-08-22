/* Example dialog

Where is Mr. X?
===============
> 32

Where are the detectives?
=========================
Red: 15
Yellow: 22
Green: 102
Blue: 43

What transit did Mr. X take?
============================
t) Taxi
b) Bus
u) Underground
f) Ferry
m) Mystery

We believe Mr. X is here:
=========================
123 (80%)
 13 (12%)
 99 (5%)
192 (3%)

*/

import inquirer from 'inquirer';
import { nextBeliefStates } from './belief.js';
import orderBy from 'lodash.orderby';

const detectives = [
  'Red',
  'Green',
  'Yellow',
  'Blue',
];

let ask = async (question) =>
  (await inquirer.prompt({...question, name:'_'}))._
;

let formatBeliefStates = (beliefStates) =>
  orderBy(
    Object.entries(beliefStates),
    [ '1', s => Number(s[0]) ],
    [ 'desc', 'asc' ]
  )
  .map(([a, p]) => `${a.padStart(3)} (${(100*p).toFixed()}%)`)
  .join('\n')
;

let main = async () => {
  let crookPosition = await ask({
    type: 'input',
    message: 'Where is Mr. X?'
  });

  let crookBeliefStates = { [crookPosition]: 1 };

  console.log('');

  while (true) {
    let detectivePositions = {};
    console.log('Where are the detectives?');
    console.log('=========================');
    for (let detective of detectives) {
      detectivePositions[detective] =
        await ask({
          type: 'input',
          message: `${detective}:`,
        });
    }

    console.log('');

    let transit = await ask({
      type: 'expand',
      message: 'What transit did Mr. X take?',
      choices: [
        { key: 't', value: 'T', name: 'Taxi' },
        { key: 'b', value: 'B', name: 'Bus' },
        { key: 'u', value: 'U', name: 'Underground' },
        { key: 'f', value: 'F', name: 'Ferry' },
        { key: 'm', value: '',  name: 'Mystery' },
      ]
    });

    console.log('');

    console.log('We believe Mr. X is here:');
    console.log('=========================');

    crookBeliefStates = nextBeliefStates(
      crookBeliefStates,
      detectivePositions,
      transit
    );
    console.log(formatBeliefStates(crookBeliefStates));

    console.log('');
  }
};

main();
