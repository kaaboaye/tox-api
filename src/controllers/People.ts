import { ServerRoute } from "hapi";
import { Person } from "../entity/Person";
import { Client } from "../entity/Client";

export const People: ServerRoute[] = [];
const path = '/people';

People.push({
    path: path + '/{clientId}',
    method: 'get',
    handler: async (request, h) => {
        const { clientId } = request.params;

        return Person.find({
            where: {
                client: clientId
            }
        });
    }
});

People.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        const recived: Person = request.payload as Person;

        const person = new Person();
        person.client = { id: recived.client.id } as Client;
        person.firstName = recived.firstName;
        person.lastName = recived.lastName;
        person.email = recived.email;
        person.phoneNumber = recived.phoneNumber;

        await person.save();

        return person;
    }
});

People.push({
    path,
    method: 'patch',
    handler: async (request, h) => {
        const recived: Person = request.payload as Person;

        const person = await Person.findOneById(recived.id);
        person.firstName = recived.firstName;
        person.lastName = recived.lastName;
        person.email = recived.email;
        person.phoneNumber = recived.phoneNumber;

        await person.save();

        return person;
    }
});