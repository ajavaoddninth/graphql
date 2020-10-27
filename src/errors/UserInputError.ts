/**
 * Custom error for input validation.
 */
export default class UserInputError extends Error {
    constructor(
        message: string,
        public validationErrors?: { [key: string]: string }) {
        super(message);
    }
}