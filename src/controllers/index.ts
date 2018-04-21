import { List } from "./List";
import { Users } from "./Users";
import { Sessions } from "./Sessions";
import { Clients } from "./Clients";
import { People } from "./People";
import { ClientJobs } from "./ClientJobs";
import { ClientDevices } from "./ClientDevices";
import { JobRegistrations } from "./JobRegistration";
import { JobDiagnoses } from "./JobDiagnoses";
import { JobOrders } from "./JobOrders";
import { JobCompletions } from "./JobCompletions";

export const Controllers = [
    ...List,
    ...Clients,
    ...ClientJobs,
    ...ClientDevices,
    ...JobRegistrations,
    ...JobDiagnoses,
    ...JobOrders,
    ...JobCompletions,
    ...People,
    ...Users,
    ...Sessions
];