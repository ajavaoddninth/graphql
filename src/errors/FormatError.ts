import { GraphQLError } from "graphql";
import UserInputError from "./UserInputError";

/**
 * Custom error formatter to handle user input errors
 * (DO NOT MODIFY)
 * @param error Error to be formatted
 */
export default function formatError(error: GraphQLError) {
    const message = error.message ?? "An unknown error occurred.";
    const locations = error.locations;
    const path = error.path;
    let extensions = error.extensions;

    if (error.originalError instanceof UserInputError) {
        extensions = {
            code: "BAD_USER_INPUT",
            exception: {
                validationErrors: error.originalError.validationErrors
            }
        };
    }

    return extensions ? 
        { message, locations, path, extensions } :
        { message, locations, path };
}