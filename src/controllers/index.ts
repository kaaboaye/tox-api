import { List } from "./List";
import { Users } from "./Users";
import { Sessions } from "./Sessions";
import { Clients } from "./Clients";
import { People } from "./People";

export const Controllers = [
    ...List,
    ...Clients,
    ...People,
    ...Users,
    ...Sessions
];