import { ServerRoute } from "hapi";
import { path as ClientsPath } from './Clients';
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { Client } from "../entity/Client";
import { Session } from "../entity/Session";
import { User } from "../entity/User";

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
                    'applicant',
                    'device'
                ],
                order: {
                    createdAt: 'DESC'
                }
            });
        }

        return Job.find({
            where: {
                client: clientId
            },
            relations: [
                'applicant',
                'device'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
});

ClientJobs.push({
    path: path + '/{jobId}',
    method: 'get',
    handler: async (request, h) => {
        const jobId: number = parseInt(request.params.jobId, 10);

        return Job.findOneById(jobId, {
           relations: [
               ...JobExtendedRelations,
               'registration.prev'
           ]
        });
    }
});

ClientJobs.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        try {
            const { clientId } = request.params;
            const { user } = request.auth.credentials as Session;
            const received: Job = request.payload as Job;

            const client = await Client.findOneById(clientId);
            if (!client) {
                throw new Error('NoSuchClient');
            }

            const u = await User.findOneById(user.id, {
                relations: ['identity']
            });

            const job = new Job();
            job.client = client;
            job.applicant = received.applicant;
            job.device = received.device;
            job.dispatcher = u.identity;
            job.state = JobState.Created;

            await job.save();

            return job;

        } catch (err) {
            if ('NoSuchClient' === err.message) {
                return h
                    .response({
                        message: 'NoSuchClient'
                    })
                    .code(404);
            }

            throw err;
        }

    }
});