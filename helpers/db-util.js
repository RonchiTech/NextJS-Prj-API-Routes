import { MongoClient } from 'mongodb';
export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://ronchinextjs:3vPLxB5YBlzDn0R0@cluster0.d74th.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}

export async function insertDocument(client, collectionName, document) {
  const db = client.db();

  const result = await db.collection(collectionName).insertOne(document);
  
  return result;
}

export async function fetchDocument(client, collectionName, sort, filterName = {}) {
  const db = client.db();
  const documents = await db
    .collection(collectionName)
    .find(filterName)
    .sort(sort)
    .toArray();
  return documents;
}
