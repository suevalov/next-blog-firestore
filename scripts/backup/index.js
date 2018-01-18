#!/usr/bin / env node

const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const error = chalk.bold.red;
const path = require("path");
const admin = require("firebase-admin");
const moment = require("moment");
const backup = require("./backup");
const collections = require("../collections");
const argv = require("yargs")
  .usage("Backup Firestore database. Usage: $0 --account [path to file]")
  .help("help")
  .alias("help", "h")
  .version("0.1.0")
  .alias("version", "v")
  .options({
    account: {
      alias: "a",
      required: true,
      description: "Path to firebase service account file"
    },
    output: {
      alias: "o",
      default: "./",
      description: "Output folder"
    }
  }).argv;

const cwd = process.cwd();

const accountFilePath = path.join(cwd, argv.account);

if (!fs.existsSync(accountFilePath)) {
  console.log(
    error(
      `Incorrect path to '${
        argv.account
      }'. Please, provide correct path to service account file!`
    )
  );
  process.exit(1);
}

const serviceAccount = require(accountFilePath);
const projectId = serviceAccount.project_id;

if (collections.length === 0) {
  console.log(error(`Please, specify collections that has to be in backup!`));
  process.exit(1);
}

const time = moment().format("YYYY-MM-DD-hh-mm");
const outputFile = `./${projectId}-${time}.json`;
const outputPath = path.join(cwd, argv.output, outputFile);

// connect to database

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const spinner = ora("Fetching data...").start();

backup(db, collections, outputPath)
  .then(() => {
    spinner.stop();
    console.log(
      chalk.green(
        `Backup for [ ${collections.join(
          ", "
        )} ] successfully written to ${outputPath}.`
      )
    );
  })
  .catch(err => {
    spinner.stop();
    console.log(error(err));
  });
