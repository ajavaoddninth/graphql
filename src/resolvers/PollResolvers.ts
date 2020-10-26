import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import PollOption from "../entities/PollOption";

const PollResolvers: IResolvers = {
    Query: {
        pollsByEmployeeId: (_, args: { employeeId: string }, context: Context): Poll[] => {
            const employee = context.employees.get(args.employeeId);
            return context.polls
                .filter(
                    item => item.companyId === employee.companyId,
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
        options: (root: Poll, _, context: Context): PollOption[] => {
            return context.pollOptions.filter(item => item.pollId == root.id);
        },

        createdByEmployee: (root: Poll, _, context: Context): Employee => {
            return context.employees.get(root.createdByEmployeeId);
        }
    }
};

export default PollResolvers;