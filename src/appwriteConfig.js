import { Client, Account } from "appwrite";

export const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66de2f8c00245b8172dd"); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
