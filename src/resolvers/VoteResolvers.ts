import { IResolvers } from "graphql-tools";

/**
 * Resolvers of fields related to votes
 */
const VoteResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * [PART 2] Returns the vote of an employee for a given poll.
         * @param _ Ignored root object
         * @param args Arguments containing employee ID and poll ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * [PART 2] Sends the vote of an employee for a given poll.
         * @param _ Ignored root object.
         * @param args Arguments containing employee ID,
         *             poll ID and option ID
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 2] Discards any votes on a poll sent by the given employee.
         * @param _ Ignored root object
         * @param args Arguments containing employee ID and poll ID
         * @param context Context to access database
         */
        // Put code here
    }
};

export default VoteResolvers;