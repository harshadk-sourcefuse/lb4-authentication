import { PasswordServiceInterface } from "../types";
import * as bcrypt from 'bcrypt';
import { inject } from "@loopback/core";
import { BcryptBinders } from "../keys";

export class PasswordService implements PasswordServiceInterface {

    constructor(@inject(BcryptBinders.SALT_ROUNDS) private saltRounds: number) {
    }

    async comparePassword(password: string, hashedPassword: string): Promise<Boolean> {
        console.log("Campare", password, "==", hashedPassword, await bcrypt.compare(password, hashedPassword));
        return bcrypt.compare(password, hashedPassword);
    }

    async generateHashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

}