import * as Hapi from 'hapi';
import {Config} from "./Config";
import {Controllers} from "./controllers";



export async function Init() {
    const server = new Hapi.Server({
        port: Config.Port,
        debug: { request: ['error'] }
    });

    // Events
    server.events.on('route', (route) => {
        console.log(`New route added: ${(route.method as string).toUpperCase()} ${route.path}`)
    });

    server.events.on('response', (r) =>{
        console.log(`${r.method.toUpperCase()} ${r.url.path} -> ${(r.response as any).statusCode}`)
    });

    // Set route prefix for example '/api'
    if (Config.RoutePrefix) {
        server.realm.modifiers.route.prefix = Config.RoutePrefix;
    }

    // await server.register(require('hapi-auth-bearer-token/lib'));
    // await server.auth.strategy('simple', 'bearer-access-token', {
    //     validate: async (request, token: string, h) => {
    //
    //         const session = await Session.findOne({
    //             where: {
    //                 token
    //             },
    //             order: {
    //                 created_at: 'DESC'
    //             },
    //             relations: ['user']
    //         });
    //
    //         if (!session || new Date().getTime() > session.expire_at.getTime()) {
    //             return {isValid: false, credentials: {}};
    //         }
    //
    //         return { isValid: true, credentials: session };
    //     }
    // });

    // server.auth.default('simple');

    // Register routes/controllers
    Controllers.forEach(server.route);

    return server;
}
