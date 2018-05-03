import { ServerRoute, Util } from "hapi";
import { Person } from "../entity/Person";
import { User } from "../entity/User";
import { Session } from "../entity/Session";

export const Users: ServerRoute[] = [];
const path = '/users';

Users.push({
    path,
    method: 'get',
    handler: async (request, h) => {
        return await User.find({
            select: [
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
    path: path + '/me',
    method: 'get',
    handler: async (request, h) => {
        const { user } = request.auth.credentials as Session;

        const u = await User.findOneById(user.id, {
            relations: ['identity']
        });

        u.password = undefined;
        return u;
    }
});

Users.push({
    path,
    method: 'post',
    options: {
        auth: false
    },
    handler: async (request, h) => {
        try {
            const { identityId, firstName, lastName, email, phoneNumber, username, password, rank } = request.payload as any;

            let identity: Person;

            // Get identity
            if (identityId) {
                identity = await Person.findOneById(identityId);
            } else {
                identity = new Person();
                identity.firstName = firstName;
                identity.lastName = lastName;
                identity.email = email;
                identity.phoneNumber = phoneNumber;
                await identity.save();
            }

            // Create User
            const user = new User();
            user.username = username;
            user.identity = identity;
            user.rank = rank;
            await user.SetPassword(password);
            await user.save();

            return user;
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

interface PatchPasswordForm {
    oldPasswd: string;
    newPasswd: string;
    repeatPasswd: string;
}
Users.push({
   path: path + '/password',
   method: 'patch',
   handler: async (request, h) => {
        try {
            const { oldPasswd, newPasswd, repeatPasswd } = request.payload as PatchPasswordForm;
            const { user } = request.auth.credentials as Session;

            if (!await user.CheckPassword(oldPasswd)) {
                throw new Error('BadPasswd');
            }

            if (newPasswd !== repeatPasswd) {
                throw new Error('PasswdsNotEqual');
            }

            await user.SetPassword(newPasswd);

            return { changed: true };

        } catch (e) {
            const handle: string[] = [
                'BadPasswd',
                'PasswdsNotEqual'
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