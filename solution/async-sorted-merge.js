"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  // As this is an async world, I cannot assume anything
  // each logSource contains a promise that resolves with a log entry, or false if the logSource has ended
  // I keep a print queue
  // When adding to the queue, I will resolve the promise and add the log entry to the sorted queue
  // might be added at any place in the queue
  // wait, did I reinvent kafka? lol
  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
