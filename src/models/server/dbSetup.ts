import {} from "node-appwrite";
import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getCreateDb() {
  try {
    await databases.get(db);
    console.log("Database already exists");
  } catch (e) {
    try {
      console.log("Creating database");
      await databases.create(db, db);
      console.log("Database created");
      console.log("Creating collections");
      await Promise.all([
        createAnswerCollection(),
        createQuestionCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections created");
    } catch (error) {
      console.log("Error creating database");
      console.log(error);
    }
  }
  return databases;
}
