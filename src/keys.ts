import { BindingKey } from "@loopback/core";
import { loggerService } from "./components/logger/logger.service";
import { TokenService } from "./services/TokenService";
import { PasswordServiceInterface } from "./types";

/**
 * Binding keys used by this component.
 */
export namespace LogBinders {
  export const LOGGER = BindingKey.create<loggerService>('custom.log.logger');
}

export namespace BcryptBinders {
  export const SALT_ROUNDS = BindingKey.create<number>('helper.bcrypt.salt_rounds');
}

export namespace ServicesBinders {
  export const PASSWORD_SERVICE = BindingKey.create<PasswordServiceInterface>('services.password-service');
  export const TOKEN_SERVICE = BindingKey.create<TokenService>('services.token-service');
}

/**
 * Enum to define the supported log levels
 */
export enum LOG_LEVEL {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}
