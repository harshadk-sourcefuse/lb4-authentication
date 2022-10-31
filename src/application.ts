import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, BindingScope } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';

export { ApplicationConfig };

import * as dotenv from "dotenv";
import * as dotenvExt from 'dotenv-extended';
import { AuthenticationComponent, Strategies } from 'loopback4-authentication';
import { LoggerComponent } from './components/logger/logger.component';
import { LoggerServiceImpl } from './components/logger/logger.service';
import { BcryptBinders, LogBinders, ServicesBinders } from './keys';
import { VerifyUserPasswordProvider } from './providers/VerifyUserPasswordProvider';
import { TokenService } from './services/TokenService';
import { PasswordService } from './services/PasswordService';
import { VerifyClientSecretProvider } from './providers/VerifyClientSecretProvider';

export class Lb4AuthenticationApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    const port = 3000;
    dotenv.config();
    dotenvExt.load({
      schema: '.env',
      errorOnMissing: true,
      includeProcessEnv: true,
    });
    options.rest = options.rest ?? {};
    options.rest.port = +(process.env.PORT ?? port);
    options.rest.host = process.env.HOST;

    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.setupApplicationDependencies();

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setupApplicationDependencies() {

    this.component(LoggerComponent);
    this.component(AuthenticationComponent);

    this.bind(BcryptBinders.SALT_ROUNDS).to(10).inScope(BindingScope.SINGLETON);

    this.bind(LogBinders.LOGGER).toClass(LoggerServiceImpl).inScope(BindingScope.SINGLETON);

    this.bind(ServicesBinders.TOKEN_SERVICE).toClass(TokenService).inScope(BindingScope.SINGLETON);
    this.bind(ServicesBinders.PASSWORD_SERVICE).toClass(PasswordService).inScope(BindingScope.SINGLETON);

    this.bind(Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER).toProvider(VerifyClientSecretProvider);
    this.bind(Strategies.Passport.LOCAL_PASSWORD_VERIFIER).toProvider(VerifyUserPasswordProvider);

  }
}