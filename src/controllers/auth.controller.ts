import { inject } from '@loopback/core';
import { response, post, HttpErrors, requestBody, } from '@loopback/rest';
import { authenticate, authenticateClient, AuthenticationBindings, AuthErrorKeys, Strategies, STRATEGY } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';
import { ServicesBinders } from '../keys';
import { User } from '../models';
import { TokenService } from '../services/TokenService';

/**
 * A simple controller to bounce back http requests
 */
export class AuthController {
    constructor(@inject(ServicesBinders.TOKEN_SERVICE) private tokenService: TokenService,
        @inject(AuthenticationBindings.CURRENT_CLIENT, { optional: true }) private readonly currentClient: User | undefined,
        @inject(AuthenticationBindings.CURRENT_USER, { optional: true }) private readonly currentUser: User | undefined,) { }

    @authorize({ permissions: ['*'] })
    @authenticateClient(STRATEGY.CLIENT_PASSWORD)
    @post('/auth/client/login')
    @response(200, {
        description: 'Ping Response',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'clientLoginResponse',
                    properties: {
                        token: { type: 'string' }
                    },
                },
            },
        }
    })
    clientLogin(@requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'clientLoginReqBody',
                    properties: {
                        client_id: { type: 'string' },
                        client_secret: { type: 'string' }
                    }
                }
            }
        }
    }) reqBody: {
        client_id: string;
        client_secret: string;
    }): object {
        if (!this.currentClient) {
            throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
        }
        if (!reqBody.client_secret) {
            throw new HttpErrors.BadRequest(AuthErrorKeys.ClientSecretMissing);
        }
        return {
            token: this.tokenService.generateJWT(this.currentClient)
        };
    }

    @authorize({ permissions: ['*'] })
    @authenticate(STRATEGY.LOCAL)
    @post('/auth/user/login')
    @response(200, {
        description: 'Ping Response',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'userLoginResponse',
                    properties: {
                        token: { type: 'string' }
                    },
                },
            },
        }
    })
    userLogin(@requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'clientLoginReqBody',
                    properties: {
                        username: { type: 'string' },
                        password: { type: 'string' }
                    }
                }
            }
        }
    }) reqBody: {
        username: string;
        password: string;
    }): object {
        if (!this.currentUser) {
            throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
        }
        if (!reqBody.password) {
            throw new HttpErrors.BadRequest(AuthErrorKeys.ClientSecretMissing);
        }
        return {
            token: this.tokenService.generateJWT(this.currentUser)
        };
    }

    @authorize({ permissions: ['*'] })
    @post('/auth/logout')
    @response(200, {
        description: 'Ping Response',
        content: {
            'application/json': {
                schema: {
                    type: 'string',
                    title: 'LogoutResponse'
                },
            },
        }
    })
    logout(): string {
        return "";
    };
}

