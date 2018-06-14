import { ServerRoute } from "hapi";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { JobCompletion } from "../entity/JobCompletion";

export const JobCompletions: ServerRoute[] = [];
export const path = '/job-completions';

JobCompletions.push({
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

            const completion = new JobCompletion();
            completion.date = received.completion.date;
            completion.description = received.completion.description;
            completion.repairTime = received.completion.repairTime;
            completion.annotations = received.completion.annotations;
            completion.serviceman = received.completion.serviceman;

            if (!job.completion) {
                job.state = JobState.Finished;
            } else {
                completion.prev = job.completion;
            }

            await completion.save();

            job.completion = completion;

            await job.save();

            if (job.completion.prev) {
                job.completion.prevId = job.completion.prev.id;
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

JobCompletions.push({
    method: 'get',
    path: path + '/{completionId}/prev',
    handler: async (request, h) => {
        const jc = await JobCompletion.findOneById(request.params.completionId, {
            relations: [
                'prev',
                'prev.serviceman'
            ]
        });

        if (!jc) {
            throw new Error('NoSuchJobCompletion');
        }

        if (!jc.prev) {
            return {};
        }

        return jc.prev;
    }
});
