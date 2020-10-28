import { IResolvers } from "graphql-tools";

/**
 * Resolvers of fields related to poll options
 */
const PollOptionResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * [PART 2] Returns the options of a poll with given ID.
         * @param _ Ignored root object
         * @param args Arguments containing poll ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * [PART 2] Creates an option under a poll with given ID,
         * and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing poll ID and option string
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 2] Deletes an option with given ID,
         * and returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for PollOption type
    PollOption: {
        /**
         * [PART 2] Returns the number of votes for a given option.
         * @param root Root option to count votes
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        // Put code here
    }
};

export default PollOptionResolvers;