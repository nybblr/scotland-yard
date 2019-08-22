Where is Mr. X?
===============

A [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) will help the detectives track down a dangerous crook at large in London!

![Scotland Yard gameplay](./images/banner.jpg)

How do I play?
--------------

To play, just run `npm start`! You’ll need Node 12 for the `Object.entries()` method.

What’s a Kalman filter?
-----------------------

Often in Artificial Intelligence and robotics, we have noisy information. We know where Mr. X *used* to be, and we know all the places he can go from there. Every possible place Mr. X could reach by some legal move is called a **Belief State.** The way we model Mr. X’s decisions is a **[Partially Observable Markov Decision Process](https://en.wikipedia.org/wiki/Partially_observable_Markov_decision_process).** It’s “partially observable” because our knowledge about Mr. X is incomplete — the point of the game is that we don’t exactly know where he is!

Usually in robotics, we have several unreliable sources of information — e.g. sensors — that we want to combine to get a reliable reading. That’s called **[Sensor Fusion](https://en.wikipedia.org/wiki/Sensor_fusion).**

So a **[Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter)** is a powerful (and simple!) sensor fusion technique: we keep track of every possible state Mr. X could have reached — we track his “ghosts” so to speak, called **belief states.** In a small game like Scotland Yard, we can get away with keeping track of all the ghosts: there are at most 199 places he could be after all!

But in a larger game space, it becomes prohibitively slow to keep track of all the ghosts, so instead we just keep a fixed number based on how likely that ghost was. That optimization is called **[Particle Filtering](https://en.wikipedia.org/wiki/Particle_filter).**

Show me the code!
-----------------

Most of the AI logic is tucked away in [`belief.js`](./belief.js), check it out!
