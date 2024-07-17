"use strict";

const _ = require("lodash");

module.exports = class Printer {
  constructor() {
    this.last = new Date(0);
    this.logsPrinted = 0;
    this.errors = [];
  }

  print(log) {
    if (!_.isDate(log?.date)) {
      console.log("No date:", log);
      throw new Error(log.date + " is not a date");
    }

    if (log.date >= this.last) {
      console.log(log.date, log.msg);
      this.last = log.date;
      this.logsPrinted++;
    } else {
      console.log("Wrong one:", log.date, log.msg);
      console.log("Last log:", this.last);
      this.errors.push(log);
    }

    if (this.logsPrinted === 1) {
      this.startTime = new Date();
    }
  }

  done() {
    var timeTaken = (new Date() - this.startTime) / 1000;
    console.log("\n***********************************");
    console.log("Logs printed:\t\t", this.logsPrinted);
    console.log("Time taken (s):\t\t", timeTaken);
    console.log("Logs/s:\t\t\t", this.logsPrinted / timeTaken);
    console.log("Errors:\t\t\t", this.errors.length);

    console.log("***********************************\n");
  }
};
