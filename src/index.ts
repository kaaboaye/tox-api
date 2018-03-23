import "reflect-metadata";
import { HapiApp, Init } from "./Hapi";
import { ConnectionConfig } from "./DataBase";
import { createConnection } from "typeorm";

// Starting point
(async () => {
    console.log(`Loading app…`);

    const server = await Init();
    (server.app as HapiApp).connection = await createConnection(ConnectionConfig);
    await server.start();

    console.log('Server running at:', server.info.uri);
})();


// createConnection().then(async connection => {
//
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);
//
//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);
//
//     console.log("Here you can setup and run express/koa/any other framework.");
//
// }).catch(error => console.log(error));
