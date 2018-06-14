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

           diagnosis.diagnosis = received.diagnosis.diagnosis;
           diagnosis.partsToReplace = received.diagnosis.partsToReplace;
           diagnosis.estimatedRepairTime = received.diagnosis.estimatedRepairTime;
           diagnosis.expertiseDate = received.diagnosis.expertiseDate;
           diagnosis.serviceman = received.diagnosis.serviceman;
           diagnosis.repairType = received.diagnosis.repairType;

           diagnosis.hydraulicNominalDimension = received.diagnosis.hydraulicNominalDimension;
           diagnosis.th01 = received.diagnosis.th01;
           diagnosis.th02 = received.diagnosis.th02;
           diagnosis.th03 = received.diagnosis.th03;
           diagnosis.th91 = received.diagnosis.th91;
           diagnosis.th92 = received.diagnosis.th92;
           diagnosis.th93 = received.diagnosis.th93;

           diagnosis.pneumaticNominalDimension = received.diagnosis.pneumaticNominalDimension;
           diagnosis.tp01 = received.diagnosis.tp01;
           diagnosis.tp02 = received.diagnosis.tp02;
           diagnosis.tp03 = received.diagnosis.tp03;
           diagnosis.tp91 = received.diagnosis.tp91;
           diagnosis.tp92 = received.diagnosis.tp92;
           diagnosis.tp93 = received.diagnosis.tp93;

           diagnosis.plungerNominalDimension = received.diagnosis.plungerNominalDimension;
           diagnosis.n01 = received.diagnosis.n01;
           diagnosis.n02 = received.diagnosis.n02;
           diagnosis.n03 = received.diagnosis.n03;
           diagnosis.n91 = received.diagnosis.n91;
           diagnosis.n92 = received.diagnosis.n92;
           diagnosis.n93 = received.diagnosis.n93;

           if (!job.diagnosis) {
            job.state = JobState.Diagnosed;
           } else {
            diagnosis.prev = job.diagnosis;
           }

           await diagnosis.save();

           job.diagnosis = diagnosis;

           await job.save();

           if (job.diagnosis.prev) {
            job.diagnosis.prevId = job.diagnosis.prev.id;
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

JobDiagnoses.push({
    method: 'get',
    path: path + '/{diagnosisId}/prev',
    handler: async (request, h) => {
        const jd = await JobDiagnosis.findOneById(request.params.diagnosisId, {
            relations: [
                'prev',
                'prev.serviceman'
            ]
        });

        if (!jd) {
            throw new Error('NoSuchJobDiagnosis');
        }

        if (!jd.prev) {
            return {};
        }

        return jd.prev;
    }
});
