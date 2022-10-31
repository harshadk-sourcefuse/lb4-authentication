import { HttpErrors } from "@loopback/rest";
import { User } from "../models";
import * as jwt from 'jsonwebtoken';

export class TokenService {

    generateJWT(user: User): string {
        if (!user) {
            throw new HttpErrors.Unauthorized('TokenService Error: generateJWT - User not found');
        }
        let token = '';
        try {
            token = jwt.sign(Object.assign({}, user), process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
                issuer: process.env.JWT_ISSUER
            })
        }
        catch (error) {
            throw new HttpErrors.InternalServerError(`TokenService Error: generateJWT - Failed to generate json web token >> ${error.message}`);
        }
        return token;
    }

    verifyJWT(token: string): User {
        if (!token) {
            throw new HttpErrors.Unauthorized('TokenService Error: verifyJWT - Token not found');
        }
        let user: User;
        try {
            user = jwt.verify(token, process.env.JWT_SECRET as string, {
                issuer: process.env.JWT_ISSUER,
            }) as User;
        } catch (error) {
            throw new HttpErrors.Unauthorized(`TokenService Error: verifyJWT - failed to verify token >> ${error.message}`);
        }
        return user;
    }
}