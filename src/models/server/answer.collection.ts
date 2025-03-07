import {Permission} from "node-appwrite"
import { db, answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection(){
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.delete("users"),
        Permission.create("users"),
    ]);
    console.log(`Collection ${answerCollection} created`);

    // Create attributes
    await Promise.all([
        databases.createStringAttribute(db,answerCollection,"content",10000,true,undefined,true),
        databases.createStringAttribute(db,answerCollection,"authorId",50,true,undefined,true),
        databases.createStringAttribute(db,answerCollection,"questionId",50,true,undefined,true),
    ])
    console.log(`Attributes created for ${answerCollection}`);
}