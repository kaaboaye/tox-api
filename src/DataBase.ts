import { ConnectionOptions } from "typeorm";
import { Client } from "./entity/Client";
import { Device } from "./entity/Device";
import { Job } from "./entity/Job";
import { JobClosure } from "./entity/JobClosure";
import { JobCompletion } from "./entity/JobCompletion";
import { JobDiagnosis } from "./entity/JobDiagnosis";
import { JobOrders } from "./entity/JobOrders";
import { JobRegistration } from "./entity/JobRegistration";
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
        Job,
        JobClosure,
        JobCompletion,
        JobDiagnosis,
        JobOrders,
        JobRegistration,
        Person,
        Session,
        User,
        TestList
    ]
};