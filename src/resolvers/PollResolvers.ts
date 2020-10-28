import { IResolvers } from "graphql-tools";

/**
 * Resolvers of fields related to polls
 */
const PollResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * [PART 2] Returns the polls under a company with given ID.
         * @param _ Ignored root object
         * @param args Arguments containing company ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * [PART 2] Creates a poll under a company with given ID,
         * and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing company ID,
         *             poll title and ID of employee who
         *             created the poll
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 2] Deletes a poll with given ID,
         * and returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for Poll type
    Poll: {
        /**
         * [PART 2] Returns the employee object who created the
         * poll.
         * @param root Root poll object to get employee
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        // Put code here
    }
};

export default PollResolvers;