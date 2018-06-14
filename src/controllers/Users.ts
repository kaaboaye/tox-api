import { ServerRoute } from "hapi";
import { Person } from "../entity/Person";
import { User } from "../entity/User";
import { Session } from "../entity/Session";
import { Group } from "../RankGroups";

export const Users: ServerRoute[] = [];
const path = '/users';

Users.push({
    path,
    method: 'get',
    handler: async (request, h) => {
        return await User.find({
            select: [
                'id',
                'username',
                'rank',
                'identity'
            ],
            relations: [
                'identity'
            ]
        });
    }
});

Users.push({
    path: path + '/{userId}',
    method: 'get',
    handler: async (request, h) => {
        const { userId } = request.params;

        const u = await User.findOneById(userId, {
            relations: ['identity']
        });
        if (!u) {
            throw new Error('NoSuchUser');
        }

        u.password = undefined;
        return u;
    }
});

Users.push({
    path: path + '/me',
    method: 'get',
    handler: async (request, h) => {
        try {

            const { user } = request.auth.credentials as Session;

            const u = await User.findOneById(user.id, {
                relations: ['identity']
            });

            u.password = undefined;
            return u;

        } catch (e) {
            const handle: string[] = [
                'NoSuchUser',
                'BadPassword',
                'PasswordsNotEqual'
            ];

            if (handle.includes(e.message)) {
                return {
                    error: {
                        message: e.message
                    }
                };
            }

            throw e;
        }
    }
});

class UserChangePassword {
    user: User;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
}
Users.push({
    path: path + '/change-password',
    method: 'post',
    handler: async (request, h) => {
        try {
            const adm = (request.auth.credentials as Session).user;
            const received = request.payload as UserChangePassword;

            const user = await User.findOneById(received.user.id, {
                relations: [
                    'identity'
                ]
            });

            if (!user) {
                throw new Error('NoSuchUser');
            }

            if (!Group.ChangeUser.includes(adm.rank) && !await user.CheckPassword(received.oldPassword)) {
                throw new Error('BadPassword');
            }

            if (received.newPassword !== received.repeatPassword) {
                throw new Error('PasswordsNotEqual');
            }

            await user.UpdatePassword(received.newPassword);

            user.password = undefined; // don't return hash

            return user;

        } catch (e) {
            const handle: string[] = [
                'NoSuchUser',
                'BadPassword',
                'PasswordsNotEqual'
            ];

            if (handle.includes(e.message)) {
                return {
                    error: {
                        message: e.message
                    }
                };
            }

            throw e;
        }
    }
});

Users.push({
    path,
    method: 'post',
    handler: async (request, h) => {
        try {
            console.log(request.auth);
            const { user } = request.auth.credentials as Session;
            if (!Group.CreateUser.includes(user.rank)) {
                throw new Error('CannotCreateUser');
            }

            const received = request.payload as User;
            console.log(request.payload);

            const u = new User();
            u.rank = received.rank;
            u.username = received.username;
            await u.SetPassword(received.password);

            u.identity = new Person();
            u.identity.firstName = received.identity.firstName;
            u.identity.lastName = received.identity.lastName;
            u.identity.email = received.identity.email;
            u.identity.phoneNumber = received.identity.phoneNumber;

            await u.identity.save();
            await u.save();
            u.password = undefined;

            return u;

        } catch (e) {
            throw e;
        }

    }
});

Users.push({
    path: path + '/login',
    method: 'post',
    options: {
        auth: false
    },
    handler: async (request, h) => {
       try {
           const { username, password } = request.payload as any;

           const user = await User.findOne({
               where: {
                   username
               }
           });

           if (!user || !(await user.CheckPassword(password))) {
               throw new Error('NoSuchUserOrBadPassword');
           }

           // Hide user password from response
           user.password = undefined;

           const expire_at = new Date();
           expire_at.setDate(expire_at.getDate() + 1);

           const session = new Session();
           session.user = user;
           await session.SetToken();
           session.ip = request.info.remoteAddress;
           session.userAgent = 'ua';
           session.expireAt = expire_at;
           await session.save();

           return session;
       } catch (e) {
           const handle: string[] = [
               'NoSuchUserOrBadPassword'
           ];

           if (handle.includes(e.message)) {
               return {
                   error: {
                       message: e.message
                   }
               };
           }

           throw e;
       }
   }
});
