import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import PollOption from "../entities/PollOption";

const PollOptionResolvers: IResolvers = {
    Query: {
        optionsByPollId: (_, args: { pollId: string }, context: Context): PollOption[] => {
            return context.pollOptions.filter(item => item.pollId == args.pollId);
        }
    },

    Mutation: {
        createPollOption: (_, args: { pollId: string, option: string }, context: Context): PollOption => {
            return context.pollOptions.create({
                pollId: args.pollId,
                option: args.option
            });
        },

        deletePollOption: (_, args: { id: string }, context: Context): PollOption => {
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