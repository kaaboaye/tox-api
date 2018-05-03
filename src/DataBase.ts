import { ConnectionOptions } from "typeorm";
import { Client } from "./entity/Client";
import { Device } from "./entity/Device";
import { Job } from "./entity/Job";
import { JobClosure } from "./entity/JobClosure";
import { JobCompletion } from "./entity/JobCompletion";
import { JobDiagnosis } from "./entity/JobDiagnosis";
import { JobOrder } from "./entity/JobOrder";
import { JobRegistration } from "./entity/JobRegistration";
import { Person } from "./entity/Person";
import { Session } from "./entity/Session";
import { User } from "./entity/User";
import { TestList } from "./entity/TestList";

export interface IdOnly {
    id: number;
}

let port: number;
if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT, 10);
} else {
    port = 32001;
}

export const ConnectionConfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    username: "postgres",
    password: "mysecretpassword",
    database: "postgres",
    port,
    synchronize: true,
    logging: true,
    entities: [
        Client,
        Device,
        Job,
        JobClosure,
        JobCompletion,
        JobDiagnosis,
        JobOrder,
        JobRegistration,
        Person,
        Session,
        User,
        TestList
    ]
};
