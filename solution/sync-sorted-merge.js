"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  console.log(logSources.length);
  // every logSource contains an array of log entries
  // I will pop the first entry from each logSource and compare them
  // while remembering the source of the entry
  // then, I will print the earliest and replace it with the next entry from the same source
  // I will repeat the process until all entries are printed from all sources

  let logs = logSources.map((logSource) => logSource.pop());
  let sources = logs.map((log, index) => index);

  let minIndex = sources.reduce((minIndex, source) => {
    if (logs[source] && logs[source].date < logs[minIndex].date) {
      return source;
    }
    return minIndex;
  }, 0);

  while (logs[minIndex]) {
    printer.print(logs[minIndex]);
    logs[minIndex] = logSources[minIndex].pop();
    minIndex = sources.reduce((minIndex, source) => {
      if (logs[source] && logs[source].date < logs[minIndex].date) {
        return source;
      }
      return minIndex;
    }, 0);
  }
  printer.done();

  return console.log("Sync sort complete from", logSources.length, "sources");
};
