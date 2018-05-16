import { UserRank } from "./entity/User";

export const Group = {
    CreateUser: [ UserRank.Admin ],
    ChangeUser: [ UserRank.Manager, UserRank.Admin ],
    UpdateJob: [ UserRank.Admin, UserRank.Manager ]
};
