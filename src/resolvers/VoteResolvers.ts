import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Vote from "../entities/Vote";

const VoteResolvers: IResolvers = {
    Query: {
        vote: (_, args: { employeeId: string, pollId: string }, context: Context): Vote | undefined => {
            return context.votes.find(item =>
                item.employeeId === args.employeeId &&
                item.pollId === args.pollId);
        }
    },

    Mutation: {
        vote: (_, args: { employeeId: string, pollId: string, optionId: string }, context: Context): Vote => {
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

        unvote: (_, args: { employeeId: string, pollId: string }, context: Context): Vote | undefined => {
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