import { IResolvers } from "graphql-tools";
import Context from "../context/Context";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to polls
 */
const PollResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * Returns the polls under a company with given ID.
         * @param _ Ignored root object
         * @param args Arguments containing company ID
         * @param context Context to access database
         */
        pollsByCompanyId: (_, args: { companyId: string }, context: Context): Poll[] => {
            return context.polls
                .filter(
                    item => item.companyId === args.companyId,
                    (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
        }
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * Creates a poll under a company with given ID,
         * and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing company ID,
         *             poll title and ID of employee who
         *             created the poll
         * @param context Context to access database
         */
        createPoll: (_, args: { companyId: string, title: string, createdByEmployeeId: string }, context: Context): Poll => {
            const validationErrors: { [key: string]: string } = {};
            
            // Validate poll title
            if (!args.title) {
                validationErrors.title = "Poll title should not be empty";
            }
            
            // Validate company ID
            if (!context.companies.has(args.companyId)) {
                validationErrors.companyId = "No company exists";
            }

            // Validate employee ID
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

        /**
         * Deletes a poll with given ID,
         * and returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        deletePoll: (_, args: { id: string }, context: Context): Poll | undefined => {
            return context.polls.delete(args.id);
        }
    },

    // Resolvers for Poll type
    Poll: {
        /**
         * Returns the employee object who created the
         * poll.
         * @param root Root poll object to get employee
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        createdByEmployee: (root: Poll, _, context: Context): Employee | undefined => {
            return context.employees.get(root.createdByEmployeeId);
        }
    }
};

export default PollResolvers;