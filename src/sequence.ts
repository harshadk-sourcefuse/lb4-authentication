import { inject } from '@loopback/core';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler } from '@loopback/rest';
import { AuthenticationBindings, AuthenticateFn } from 'loopback4-authentication';
import { LoggerServiceImpl } from './components/logger/logger.service';
import { LogBinders, LOG_LEVEL } from './keys';
import { User } from './models';

export class MySequence implements SequenceHandler {

    constructor(
        @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
        @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
        @inject(SequenceActions.SEND) public send: Send,
        @inject(SequenceActions.REJECT) public reject: Reject,
        @inject(AuthenticationBindings.CLIENT_AUTH_ACTION)
        protected authenticateRequestClient: AuthenticateFn<User>,
        @inject(AuthenticationBindings.USER_AUTH_ACTION)
        protected authenticateRequest: AuthenticateFn<User>,

        @inject(LogBinders.LOGGER) private logger: LoggerServiceImpl
    ) {
    }

    async handle(context: RequestContext): Promise<void> {
        const { request, response } = context;
        const referer = (request.headers['referer'] || request.headers['host'])?.replace(/(http|https):\/\//, '')?.split('/')[0];
        let message = `${request.method} ${request.url} started at ${new Date().toString()}.`;
        message = message + ` Referer : ${referer}`;
        message = message + ` User-Agent : ${request.headers['user-agent']}`;
        message = message + ` Remote Address : ${request['connection']['remoteAddress']}`;
        this.logger.log(LOG_LEVEL.INFO, message);

        try {
            const route = this.findRoute(request);
            const args = await this.parseParams(request, route);

            this.logger.log(LOG_LEVEL.DEBUG, `${request.method} ${request.url} :--: controller : ${route.spec['x-controller-name']} method : ${route.spec['x-operation-name']}`);

            await this.authenticateRequestClient(request);

            const authUser: User = await this.authenticateRequest(request);

            const result = await this.invoke(route, args);
            this.send(response, result);
        } catch (error) {
            this.logger.log(LOG_LEVEL.ERROR, `${request.method} ${request.url} error occured at ${new Date().toString()} ERROR: ${error.message} ${JSON.stringify(error, null, 2)}`);
            this.reject(context, error);
        } finally {
            this.logger.log(LOG_LEVEL.INFO, `${request.method} ${request.url} completed at ${new Date().toString()}`);

        }
    }
}
