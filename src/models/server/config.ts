import env from "@/env";
import { Client, Avatars, Databases, Storage, Users } from "node-appwrite";

let client = new Client();

try {
  client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey); // Your secret API key
} catch (error) {
  console.error("Error creating appwrite client");
  console.error(error);
}
const users = new Users(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
if(!users || !databases || !avatars || !storage) {
  throw new Error("Error creating appwrite services");
}
export { client, databases, avatars, storage, users };
