import {} from "node-appwrite";
import {questionAttachmentBucket } from "../name";
import { storage } from "./config";
import { Permission } from "appwrite";

export default async function createQuestionAttachmentBucket() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log(`Bucket ${questionAttachmentBucket} already exists`);
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          Permission.read("any"),
          Permission.write("users"),
          Permission.delete("users"),
          Permission.read("users"),
          Permission.create("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "jpeg", "png", "gif", "webp", "heic", "svg"]
      );
      console.log(`Bucket ${questionAttachmentBucket} created`);
    } catch (error) {
      console.error(`Error creating bucket ${questionAttachmentBucket}`);
      console.error(error);
    }
  }
}
