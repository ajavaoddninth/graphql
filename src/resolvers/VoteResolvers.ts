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
        answerPoll: (_, args: { employeeId: string, pollId: string, optionId: string }, context: Context): boolean => {
            try {
                // Remove old votes for requested poll    
                context.votes
                    .filter(item =>
                        item.employeeId === args.employeeId &&
                        item.pollId === args.pollId)
                    .map(item => context.votes.delete(item.id));

                context.votes.create({
                    employeeId: args.employeeId,
                    pollId: args.pollId,
                    optionId: args.optionId
                });

                return true;
            } catch {
                return false;
            }
        },

        removeAnswer: (_, args: { employeeId: string, pollId: string }, context: Context): boolean => {
            try {  
                context.votes
                    .filter(item =>
                        item.employeeId === args.employeeId &&
                        item.pollId === args.pollId)
                    .map(item => context.votes.delete(item.id));

                return true;
            } catch {
                return false;
            }
        }
    }
};

export default VoteResolvers;