import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Vote from "../entities/Vote";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to votes
 */
const VoteResolvers: IResolvers = {
    Query: {
        vote: (_, args: { employeeId: string, pollId: string }, context: Context): Vote | undefined => {
            return context.votes.find(item =>
                item.employeeId === args.employeeId &&
                item.pollId === args.pollId);
        }
    },

    Mutation: {
        sendVote: (_, args: { employeeId: string, pollId: string, optionId: string }, context: Context): Vote => {
            const validationErrors: { [key: string]: string } = {};

            if (!context.employees.has(args.employeeId)) {
                validationErrors.employeeId = "No employee exists";
            }

            if (!context.polls.has(args.pollId)) {
                validationErrors.pollId = "No poll exists";
            }

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