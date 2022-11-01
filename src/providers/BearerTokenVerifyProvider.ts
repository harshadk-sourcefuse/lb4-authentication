import { Provider } from '@loopback/context';
import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { VerifyFunction } from 'loopback4-authentication';
import { ServicesBinders } from '../keys';

import { User } from '../models/user.model';
import { TokenService } from '../services/TokenService';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  constructor(
    @inject(ServicesBinders.TOKEN_SERVICE)
    public tokenService: TokenService,
  ) { }

  value(): VerifyFunction.BearerFn {
    return async (token) => {
      if (!token) {
        throw new HttpErrors.Unauthorized('Token Not Found');
      }
      const user = this.tokenService.verifyJWT(token) as User;
      return user;
    };
  }
}
