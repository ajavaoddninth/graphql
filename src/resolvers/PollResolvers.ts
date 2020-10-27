import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to polls
 */
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
            const validationErrors: { [key: string]: string } = {};
            
            if (!args.title) {
                validationErrors.title = "Poll title should not be empty";
            }
            
            if (!context.companies.has(args.companyId)) {
                validationErrors.companyId = "No company exists";
            }

            if (!context.employees.has(args.createdByEmployeeId)) {
                validationErrors.createdByEmployeeId = "No employee exists";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to create a poll due to validation errors",
                    validationErrors);
            }

            return context.polls.create({
                companyId: args.companyId,
                title: args.title,
                createdByEmployeeId: args.createdByEmployeeId,
                createTime: new Date()
            });
        },

        deletePoll: (_, args: { id: string }, context: Context): Poll | undefined => {
            return context.polls.delete(args.id);
        }
    },

    Poll: {
        createdByEmployee: (root: Poll, _, context: Context): Employee | undefined => {
            return context.employees.get(root.createdByEmployeeId);
        }
    }
};

export default PollResolvers;