import { ServerRoute } from "hapi";
import { JobClosure } from "../entity/JobClosure";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";

export const JobClosures: ServerRoute[] = [];
export const path = '/job-closures';

JobClosures.push({
    path,
    method: 'post',
    handler: async (requset, h) => {
        try {
            const received = requset.payload as Job;
            const job = await Job.findOneById(received.id, {
                relations: JobExtendedRelations
            });

            if (!job) {
                throw new Error('NoSuchJob');
            }

            const closure = new JobClosure();
            closure.annotations = received.closure.annotations;
            closure.dateOfDispatch = received.closure.dateOfDispatch;
            closure.dateOfClosure = new Date();

            await closure.save();

            job.closure = closure;
            job.state = JobState.Closed;

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