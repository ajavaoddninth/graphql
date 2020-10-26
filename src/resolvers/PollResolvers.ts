import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";

const PollResolvers: IResolvers = {
    Query: {
        pollsByCompanyId: (_, args: { companyId: string }, context: Context): Poll[] => {
            return context.polls
                .filter(
                    item => item.companyId === args.companyId,
                    (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
        }
    },

    Mutation: {
        createPoll: (_, args: { companyId: string, title: string, createdByEmployeeId: string }, context: Context): Poll => {
            return context.polls.create({
                companyId: args.companyId,
                title: args.title,
                createdByEmployeeId: args.createdByEmployeeId,
                createTime: new Date()
            });
        },

        deletePoll: (_, args: { id: string }, context: Context): Poll => {
            return context.polls.delete(args.id);
        }
    },

    Poll: {
        createdByEmployee: (root: Poll, _, context: Context): Employee => {
            return context.employees.get(root.createdByEmployeeId);
        }
    }
};

export default PollResolvers;