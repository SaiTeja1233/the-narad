import { Client, Account } from "appwrite";

export const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("671bce910012a627c0e2"); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
