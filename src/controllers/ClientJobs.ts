import { ServerRoute } from "hapi";
import { path as ClientsPath } from './Clients';
import { Job } from "../entity/Job";
import { Client } from "../entity/Client";

export const ClientJobs: ServerRoute[] = [];
const path = ClientsPath + '/{clientId}/jobs';

ClientJobs.push({
    path,
    method: 'get',
    handler: async (request, h) => {
        const clientId: number = parseInt(request.params.clientId, 10);

        if (clientId === 0) {
            return Job.find({
                relations: [
                    'client',
                    'device'
                ]
            });
        }

        return Job.find({
            where: {
                client: clientId
            },
            relations: [
                'device'
            ]
        });
    }
});

ClientJobs.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        const { clientId } = request.params;

        const client = Client.findOneById(clientId);

        const job = new Job();

    }
});