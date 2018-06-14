import { ServerRoute } from "hapi";

export const Sessions: ServerRoute[] = [];
const path = '/sessions';

Sessions.push({
    path: path + '/ping',
    method: 'get',
    handler: async (request, h) => {
        return { session: true };
    }
});
