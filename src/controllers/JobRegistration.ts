import { ServerRoute } from "hapi";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { JobRegistration } from "../entity/JobRegistration";

export const JobRegistrations: ServerRoute[] = [];
export const path = '/job-registration';

JobRegistrations.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        try {
            const received = request.payload as Job;
            const job = await Job.findOneById(received.id, {
                relations: JobExtendedRelations
            });

            if (!job) {
                throw new Error('NoSuchJob');
            }

            const registration = new JobRegistration();
            registration.type = received.registration.type;
            registration.placeOfRealisation = received.registration.placeOfRealisation;
            registration.description = received.registration.description;

            if (!job.registration) {
                job.state = JobState.Registered;
            } else {
                registration.prev = job.registration;
            }

            await registration.save();

            job.registration = registration;

            await job.save();

            if (job.registration.prev) {
                job.registration.prevId = job.registration.prev.id;
            }

            return job;

        } catch (err) {

            if ('NoSuchJob' === err.message) {
                return h
                    .response({
                        message: err.message
                    })
                    .code(404);
            }

            throw err;
        }
    }
});

JobRegistrations.push({
    path: path + '/{registrationId}/prev',
    method: 'get',
    handler: async (request, h) => {
        try {
            const jr = await JobRegistration.findOneById(request.params.registrationId, {
                relations: [
                    'prev'
                ]
            });

            if (!jr) {
                throw new Error('NoSuchJobRegistration');
            }

            if (!jr.prev) {
                return {};
            }

            return jr.prev;

        } catch (err) {
            throw err;
        }
    }
});
