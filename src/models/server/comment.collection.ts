import { Permission } from "node-appwrite";
import { db, commentCollection } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.delete("users"),
    Permission.create("users"),
  ]);
  console.log(`Collection ${commentCollection} created`);

  await Promise.all([
    databases.createStringAttribute(
      db,
      commentCollection,
      "content",
      10000,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      commentCollection,
      "authorId",
      50,
      true,
      undefined,
      true
    ),
    databases.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(
      db,
      commentCollection,
      "typeId",
      50,
      true,
      undefined,
      true
    ),
  ]);
  console.log(`Attributes created for ${commentCollection}`);
}
