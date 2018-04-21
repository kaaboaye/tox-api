import { ServerRoute } from "hapi";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { JobDiagnosis } from "../entity/JobDiagnosis";

export const JobDiagnoses: ServerRoute[] = [];
export const path = '/job-diagnoses';

JobDiagnoses.push({
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

           const diagnosis = new JobDiagnosis();

           delete received.diagnosis.id;
           delete received.diagnosis.createdAt;
           delete received.diagnosis.prev;

           for (const prop of Object.keys(received.diagnosis)) {
               console.log(prop);
               diagnosis[prop] = received.diagnosis[prop];
           }

           await diagnosis.save();

           job.diagnosis = diagnosis;
           job.state = JobState.Diagnosed;

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