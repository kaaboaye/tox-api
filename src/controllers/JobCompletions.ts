import { ServerRoute } from "hapi";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { JobCompletion } from "../entity/JobCompletion";
import { convertRuleOptions } from "tslint/lib/configuration";

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

            await completion.save();

            job.completion = completion;
            job.state = JobState.Finished;

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
