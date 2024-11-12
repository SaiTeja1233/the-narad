
import { Client, Users } from "node-appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66de2f8c00245b8172dd")
    .setKey(
        "standard_8b56bdfdc8c0558b185d524d1fa48d0086f523884f9b9ae1a0442676ffdcb6ae9255b2acc527af2d8e1020efbef497b971f03f9e51282db0880c07f2998658767105be77d5f55d02601b8b7a232f1e1ef7be9e75c973461682ec24be9a3ca30e28336f16dd732295f24e3e3eabdd717a048e1da925d4daf10d7c63fa1624d7d2"
    );

export const users = new Users(client);


