// Node 12 includes Object.entries()
export let mapValues = (object, transform) =>
  Object.fromEntries(Object.entries(object)
    .map(([k, v]) => [k, transform(v)]));
