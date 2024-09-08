import { Client, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66dcc16a00100995d6e8");

export const account = new Account(client);

export default client;
