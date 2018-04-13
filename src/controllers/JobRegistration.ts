import { ServerRoute } from "hapi";
import { Job, JobState } from "../entity/Job";
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
                relations: [
                    'client',
                    'applicant',
                    'dispatcher',
                    'device',
                    'registration'
                ]
            });

            if (!job) {
                throw new Error('NoSuchJob');
            }

            const registration = new JobRegistration();
            registration.type = received.registration.type;
            registration.placeOfRealisation = received.registration.placeOfRealisation;
            registration.description = received.registration.description;

            await registration.save();

            job.registration = registration;
            job.state = JobState.Registered;

            await job.save();

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