import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import PollOption from "../entities/PollOption";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to poll options
 */
const PollOptionResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * Returns the options of a poll with given ID.
         * @param _ Ignored root object
         * @param args Arguments containing poll ID
         * @param context Context to access database
         */
        optionsByPollId: (_, args: { pollId: string }, context: Context): PollOption[] => {
            return context.pollOptions.filter(item => item.pollId == args.pollId);
        }
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * Creates an option under a poll with given ID,
         * and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing poll ID and option string
         * @param context Context to access database
         */
        createPollOption: (_, args: { pollId: string, option: string }, context: Context): PollOption => {
            const validationErrors: { [key: string]: string } = {};
            
            // Validate option string
            if (!args.option) {
                validationErrors.option = "Option should not be empty";
            }

            // Validate poll ID
            if (!context.polls.has(args.pollId))
            {
                validationErrors.pollId = "No poll exists";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to create an option due to validation errors",
                    validationErrors);
            }

            return context.pollOptions.create({
                pollId: args.pollId,
                option: args.option
            });
        },

        /**
         * Deletes an option with given ID,
         * and returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        deletePollOption: (_, args: { id: string }, context: Context): PollOption | undefined => {
            return context.pollOptions.delete(args.id);
        }
    },

    // Resolvers for PollOption type
    PollOption: {
        /**
         * Returns the number of votes for a given option.
         * @param root Root option to count votes
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        tally: (root: PollOption, _, context: Context): number => {
            return context.votes.count(item => item.optionId === root.id);
        }
    }
};

export default PollOptionResolvers;