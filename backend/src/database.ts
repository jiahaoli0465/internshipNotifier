// src/database.ts
import { MongoClient, Db } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db: Db;

const connectDB = async (): Promise<Db> => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("your-db-name");
      console.log("MongoDB connected...");
    } catch (err) {
      console.error((err as Error).message);
      process.exit(1);
    }
  }
  return db;
};

export { connectDB, db };
