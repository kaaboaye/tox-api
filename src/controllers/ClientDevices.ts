import { ServerRoute } from "hapi";
import { path as ClientsPath } from './Clients';
import { Device } from "../entity/Device";
import { Client } from "../entity/Client";

export const ClientDevices: ServerRoute[] = [];
const path = ClientsPath + '/{clientId}/devices';

ClientDevices.push({
    path,
    method: 'get',
    handler: async (request, h) => {
        const clientId = parseInt(request.params.clientId, 10);

        if (clientId === 0) {
            return Device.find({
                relations: [
                    'owner'
                ]
            });
        }

        return Device.find({
            where: {
                owner: clientId
            }
        });
    }
});

ClientDevices.push({
    path: path + '/{deviceId}',
    method: 'get',
    handler: async (request, h) => {
        const deviceId = parseInt(request.params.deviceId, 10);

        return Device.findOneById(deviceId, {
            relations: [
                'owner'
            ]
        });
    }
});

ClientDevices.push({
   path,
   method: 'post',
   handler: async (request, h): Promise<any> => {
       try {
           const { clientId } = request.params;
           const recived: Device = request.payload as Device;
           const client = await Client.findOneById(clientId);

           if (!client) {
               throw new Error('NoSuchClient');
           }

           const device = new Device();
           device.serialNumber = recived.serialNumber;
           device.type = recived.type;
           device.denotement = recived.denotement;
           device.owner = client;

           await device.save();

           return device;

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