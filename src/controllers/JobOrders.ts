import { ServerRoute } from "hapi";
import { Job, JobExtendedRelations, JobState } from "../entity/Job";
import { JobOrder } from "../entity/JobOrder";

export const JobOrders: ServerRoute[] = [];
export const path = '/job-orders';

JobOrders.push({
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

            const order = new JobOrder();
            order.clientsOrder = received.order.clientsOrder;
            order.numberSAP = received.order.numberSAP;
            order.purchaseOrder = received.order.purchaseOrder;

            if (!job.order) {
                job.state = JobState.Ordered;
            } else {
                order.prev = job.order;
            }

            await order.save();

            job.order = order;

            await job.save();

            if (job.order.prev) {
                job.order.prevId = job.order.id;
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

JobOrders.push({
    method: 'get',
    path: path + '/{orderId}/prev',
    handler: async (request, h) => {
        const jo = await JobOrder.findOneById(request.params.orderId, {
            relations: [
                'prev'
            ]
        });

        if (!jo) {
            throw new Error('NoSuchJobOrder');
        }

        if (!jo.prev) {
            return {};
        }

        return jo.prev;
    }
});
