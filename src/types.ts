/**
 * Log writing function
 */
export type LogWriterFunction = (level: number, msg: string) => void;

/**
 * Password Service Interface
 * provides following functions
 * * `comparePassword` : Method to check if password is same as hashed password of user
 *   * `password` : provided plain password
 *   * `hashedPassword` : hashed password from db
 * * `generateHashPassword` : Method to generate hashed password from plain password
     * `password` : provided plain password
 */
export interface PasswordServiceInterface {
    /**
     * Method to check if password is same as hashed password of user
     * @param password provided plain password
     * @param hashedPassword hashed password from db
     */
    comparePassword(password: string, hashedPassword: string): Promise<Boolean>;
    /**
     * Method to generate hashed password from plain password
     * @param password provided plain password
     */
    generateHashPassword(password: string): Promise<string>;
}
