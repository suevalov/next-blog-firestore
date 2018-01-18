#!/usr/bin / env node

const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const error = chalk.bold.red;
const path = require("path");
const admin = require("firebase-admin");
const promptConfirm = require("prompt-confirm");
const restore = require("./restore");
const collections = require("../collections");
const argv = require("yargs")
  .usage(
    "Restore Firestore database. Usage: $0 --account [path to file] --input [path to file]"
  )
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
    input: {
      alias: "i",
      required: true,
      description: "Path to backup file"
    }
  }).argv;

const cwd = process.cwd();
const accountFilePath = path.join(cwd, argv.account);
const inputFilePath = path.join(cwd, argv.input);

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

if (!fs.existsSync(inputFilePath)) {
  console.log(
    error(
      `Incorrect path to ${
        argv.input
      }. Please, provide correct path to backup file!`
    )
  );
  process.exit(1);
}

const serviceAccount = require(accountFilePath);
const backupFile = require(inputFilePath);
const projectId = serviceAccount.project_id;

if (collections.length === 0) {
  console.log(error(`Please, specify collections that has be restored!`));
  process.exit(1);
}

collections.forEach(key => {
  if (!backupFile[key]) {
    console.log(error(`Backup file doesn't have "${key}" data`));
    process.exit(1);
  }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const prompt = new promptConfirm({
  message: `Are to sure that you want to restore backup for "${projectId}"?`,
  default: false
});

prompt.ask(answer => {
  if (answer) {
    const spinner = ora("Restoring backup...").start();
    restore(db, collections, backupFile)
      .then(() => {
        spinner.stop();
        console.log(chalk.green("Backup has been restored!"));
      })
      .catch(err => {
        spinner.stop();
        console.error(err);
      });
  } else {
    console.log(chalk.grey(`Restoring backup is cancelled.`));
  }
});
