import { Db, MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
let db: Db;
let client: MongoClient;

export function connect() {
  client = new MongoClient(uri);

  console.log("Connected successfully to server");
  db = client.db("nextapp");
}

export function getDb() {
  if (!db) {
    connect();
  }

  return db;
}
