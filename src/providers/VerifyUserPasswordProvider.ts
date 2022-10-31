import { Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { VerifyFunction } from 'loopback4-authentication';

import { UserRepository } from '../repositories';

export class VerifyUserPasswordProvider
    implements Provider<VerifyFunction.LocalPasswordFn>
{
    constructor(
        @repository(UserRepository)
        public authClientRepository: UserRepository,
    ) { }

    value(): VerifyFunction.LocalPasswordFn {
        return async (username, password, req) => {
            return this.authClientRepository.getUserByUsernameAndPasword(username, password);
        };
    }
}
