/* eslint-disable import/first */

function isNode() {
  return (
    typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node"
  );
}

if (isNode()) {
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

require("@firebase/polyfill");
const firebase = require("@firebase/app").default;
require("@firebase/firestore");
require("@firebase/auth");

try {
  firebase.initializeApp({
    apiKey: process.env.F_API_KEY,
    authDomain: process.env.F_AUTH_DOMAIN,
    projectId: process.env.F_PROJECT_ID
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
