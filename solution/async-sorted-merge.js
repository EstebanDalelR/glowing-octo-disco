"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  console.log(logSources.length);
  // Similar to the sync solution, I will pop the first entry from each logSource and compare them
  // the difference is that I will have to wait for a new entry if the random so decides it

  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
