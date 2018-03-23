import { ConnectionOptions } from "typeorm";
import { Client } from "./entity/Client";
import { Device } from "./entity/Device";
import { Event } from "./entity/Event";
import { EventClosure } from "./entity/EventClosure";
import { EventCompletion } from "./entity/EventCompletion";
import { EventDiagnosis } from "./entity/EventDiagnosis";
import { EventOrders } from "./entity/EventOrders";
import { EventRegistration } from "./entity/EventRegistration";
import { Person } from "./entity/Person";
import { Session } from "./entity/Session";
import { User } from "./entity/User";
import { TestList } from "./entity/TestList";

export interface IdOnly {
    id: number;
}

export const ConnectionConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "mysecretpassword",
    database: "postgres",
    port: 32001,
    synchronize: true,
    logging: true,
    entities: [
        Client,
        Device,
        Event,
        EventClosure,
        EventCompletion,
        EventDiagnosis,
        EventOrders,
        EventRegistration,
        Person,
        Session,
        User,
        TestList
    ]
};