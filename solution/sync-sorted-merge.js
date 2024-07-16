"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  console.log(logSources.length);
  // every logSource contains an array of log entries
  // I will pop the first entry from each logSource and compare them
  // while remembering the source of the entry
  // then, I will print the earliest and replace it with the next entry from the same source
  // I will repeat the process until all entries are printed from all sources

  return console.log("Sync sort complete.");
};
