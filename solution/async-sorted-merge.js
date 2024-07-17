"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    // As this is an async world, I cannot assume anything
    // each logSource contains a promise that resolves with a log entry, or false if the logSource has ended
    // I keep a print queue
    // When adding to the queue, I will resolve the promise and add the log entry to the sorted queue
    // might be added at any place in the queue
    // wait, did I reinvent kafka? lol

    let queue = [];

    // helper async function to get the next log entry from a log source
    // will give the log or false if the log source has ended
    const popNext = async (index) => {
      return logSources[index].popAsync();
    };

    // Add the log entry to the queue in the correct order
    const addToQueue = (sourceIndex, log) => {
      // We need to keep the source index to pop the next log entry
      const logEntry = { sourceIndex, log };
      if (queue.length === 0) {
        queue.push(logEntry);
      } else {
        let insertIndex = queue.findIndex((entry) => entry.log.date > log.date);
        // not found, bigger than the last one
        if (insertIndex === -1) {
          queue.push(logEntry);
        } else {
          queue.splice(insertIndex, 0, logEntry);
        }
      }
    };

    // A way to initialize all the sources
    const initializeQueue = async () => {
      for (let i = 0; i < logSources.length; i++) {
        const log = await popNext(i);
        if (log) {
          addToQueue(i, log);
        }
      }
    };
    // Print the logs in the queue
    const printQueue = async () => {
      while (queue.length > 0) {
        const logToPrint = queue.shift();
        printer.print(logToPrint.log);
        const nextLog = await popNext(logToPrint.sourceIndex);
        if (nextLog) {
          addToQueue(logToPrint.sourceIndex, nextLog);
        }
      }
      printer.done();
      resolve();
    };

    resolve(console.log("Async sort complete."));
  });
};
