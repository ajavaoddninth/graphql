import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import PollOption from "../entities/PollOption";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to poll options
 */
const PollOptionResolvers: IResolvers = {
    Query: {
        optionsByPollId: (_, args: { pollId: string }, context: Context): PollOption[] => {
            return context.pollOptions.filter(item => item.pollId == args.pollId);
        }
    },

    Mutation: {
        createPollOption: (_, args: { pollId: string, option: string }, context: Context): PollOption => {
            const validationErrors: { [key: string]: string } = {};
            
            if (!args.option) {
                validationErrors.option = "Option should not be empty";
            }

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

        deletePollOption: (_, args: { id: string }, context: Context): PollOption | undefined => {
            return context.pollOptions.delete(args.id);
        }
    },

    PollOption: {
        tally: (root: PollOption, _, context: Context): number => {
            return context.votes.count(item => item.optionId === root.id);
        }
    }
};

export default PollOptionResolvers;