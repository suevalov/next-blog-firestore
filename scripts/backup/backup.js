const jsonfile = require("jsonfile");

const fetchCollection = async (db, collection) => {
  const ref = db.collection(collection);
  const snapshot = await ref.get();
  const json = [];
  snapshot.forEach(doc => {
    json.push(doc.data());
  });
  return {
    collection: collection,
    data: json
  };
};

const start = async (db, collections, outputPath) => {
  const items = await Promise.all(
    collections.map(collection => fetchCollection(db, collection))
  );

  const json = items.reduce((prev, item) => {
    return {
      ...prev,
      [item.collection]: item.data
    };
  }, {});

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(outputPath, json, { spaces: 2 }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = start;
