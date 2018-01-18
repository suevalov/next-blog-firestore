const deleteQueryBatch = async (db, query, batchSize, resolve, reject) => {
  const snapshot = await query.get();
  // When there are no documents left, we are done
  if (snapshot.size === 0) {
    resolve();
    return;
  }

  // Delete documents in a batch
  let batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  const batchSnapshot = await batch.commit();
  const numDeleted = batchSnapshot.size;
  if (numDeleted === 0) {
    resolve();
    return;
  }

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
};

function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

const restoreCollection = async (db, collection, data) => {
  await deleteCollection(db, collection, 100);
  const batch = db.batch();
  data.forEach(item => {
    let ref = db.collection(collection).doc(item.id);
    batch.set(ref, item);
  });
  await batch.commit();
};

const start = async (db, collections, data) => {
  for (let i = 0; i < collections.length; i++) {
    if (data[collections[i]]) {
      await restoreCollection(db, collections[i], data[collections[i]]);
    }
  }
};

module.exports = start;
