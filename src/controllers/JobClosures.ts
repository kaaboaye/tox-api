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

            if (!job.closure) {
                job.state = JobState.Closed;
            } else {
                closure.prev = job.closure;
            }

            await closure.save();

            job.closure = closure;

            await job.save();

            if (job.closure.prev) {
                job.closure.prevId = job.closure.prev.id;
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

JobClosures.push({
    method: 'get',
    path: path + '/{closureId}/prev',
    handler: async (request, h) => {
        const jc = await JobClosure.findOneById(request.params.closureId, {
            relations: [
                'prev'
            ]
        });

        if (!jc) {
            throw new Error('NoSuchJobClosure');
        }

        if (!jc.prev) {
            return {};
        }

        return jc.prev;
    }
});
