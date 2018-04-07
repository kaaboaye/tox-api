import { ServerRoute } from "hapi";
import { Client } from "../entity/Client";

export const Clients: ServerRoute[] = [];
export const path = '/clients';

Clients.push({
    path,
    method: 'get',
    handler: async (request, h) => {
        return Client.find();
    }
});

Clients.push({
    path: path + '/{id}',
    method: 'get',
    handler: async (request, h) => {
        const { id } = request.params;

        return Client.findOneById(id, {
            relations: ['staff']
        });
    }
});

Clients.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        try {
            const { name, street, postalCode, city } = request.payload as Client;

            const client = new Client();
            client.name = name;
            client.street = street;
            client.postalCode = postalCode;
            client.city = city;

            return client.save();

        } catch (e) {
            const errors: string[] = [
                'QueryFailedError'
            ];

            const {name, message, detail} = e;

            if (errors.includes(message)) {
                return {
                    error: {name, message, detail}
                };
            }

            throw e;
        }
    }
});