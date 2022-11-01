import { Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { VerifyFunction } from 'loopback4-authentication';

import { UserRepository } from '../repositories';

export class VerifyClientSecretProvider
    implements Provider<VerifyFunction.OauthClientPasswordFn>
{
    constructor(
        @repository(UserRepository)
        public authClientRepository: UserRepository,
    ) { }

    value(): VerifyFunction.OauthClientPasswordFn {
        return async (clientId, clientSecret, req) => {
            return this.authClientRepository.findOne({
                where: { clientId, clientSecret },
                include: ["role"]
            });
        };
    }
}
