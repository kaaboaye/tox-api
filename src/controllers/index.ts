import { List } from "./List";
import { Users } from "./Users";
import { Sessions } from "./Sessions";
import { Clients } from "./Clients";
import { People } from "./People";
import { ClientJobs } from "./ClientJobs";
import { ClientDevices } from "./ClientDevices";
import { JobRegistrations } from "./JobRegistration";

export const Controllers = [
    ...List,
    ...Clients,
    ...ClientJobs,
    ...ClientDevices,
    ...JobRegistrations,
    ...People,
    ...Users,
    ...Sessions
];