import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Vote from "../entities/Vote";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to votes
 */
const VoteResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * Returns the vote of an employee for a given poll.
         * @param _ Ignored root object
         * @param args Arguments containing employee ID and poll ID
         * @param context Context to access database
         */
        vote: (_, args: { employeeId: string, pollId: string }, context: Context): Vote | undefined => {
            return context.votes.find(item =>
                item.employeeId === args.employeeId &&
                item.pollId === args.pollId);
        }
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * Sends the vote of an employee for a given poll.
         * @param _ Ignored root object.
         * @param args Arguments containing employee ID,
         *             poll ID and option ID
         * @param context Context to access database
         */
        sendVote: (_, args: { employeeId: string, pollId: string, optionId: string }, context: Context): Vote => {
            const validationErrors: { [key: string]: string } = {};

            // Validate employee ID
            if (!context.employees.has(args.employeeId)) {
                validationErrors.employeeId = "No employee exists";
            }

            // Validate poll ID
            if (!context.polls.has(args.pollId)) {
                validationErrors.pollId = "No poll exists";
            }

            // Validate option ID
            if (!context.pollOptions.has(args.optionId)) {
                validationErrors.optionId = "No option exists";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to create a vote due to validation errors",
                    validationErrors);
            }

            // Remove old votes for requested poll
            const oldVote = context.votes
                .find(item =>
                    item.employeeId === args.employeeId &&
                    item.pollId === args.pollId);
            
            if (oldVote) {
                context.votes.delete(oldVote.id);
            }

            return context.votes.create({
                employeeId: args.employeeId,
                pollId: args.pollId,
                optionId: args.optionId
            });
        },

        /**
         * Discards any votes on a poll sent by the given employee.
         * @param _ Ignored root object
         * @param args Arguments containing employee ID and poll ID
         * @param context Context to access database
         */
        discardVote: (_, args: { employeeId: string, pollId: string }, context: Context): Vote | undefined => {
            const oldVote = context.votes
                .find(item =>
                    item.employeeId === args.employeeId &&
                    item.pollId === args.pollId);
            
            if (oldVote) {
                context.votes.delete(oldVote.id);
            }

            return oldVote;
        }
    }
};

export default VoteResolvers;