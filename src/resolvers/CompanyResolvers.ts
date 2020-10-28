import { IResolvers } from "graphql-tools";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import CompanyInput from "../inputTypes/CompanyInput";
import Context from "../context/Context";
import UserInputError from "../errors/UserInputError";

/**
 * Resolvers of fields related to companies
 */
const CompanyResolvers: IResolvers = {
    // Resolver for Query type
    Query: {
        /**
         * Returns all of the companies.
         * @param _ Ignored root object
         * @param __ Ignored argument object
         * @param context Context to access database
         */
        companies: (_, __, context: Context): Company[] => {
            return context.companies.list();
        },

        /**
         * Returns a single company with the requested ID.
         * @param _ Ignored root object
         * @param args Argument containing the company ID
         * @param context Context to access database
         */
        company: (_, args: { id: string }, context: Context): Company | undefined => {
            return context.companies.get(args.id);
        }
    },

    // Resolver for Mutation type
    Mutation: {
        /**
         * [PART 1-15] Creates a single company from the given details,
         * and returns it.
         * @param _ Ignored root object
         * @param args Argument containing the company details
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 1-16] Updates a company with given ID using the
         * given details, and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing ID and update details
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 1-17] Deletes a company with given ID, and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolver for Company type
    Company: {
        /**
         * [PART 1-10] Returns the employees under a given company.
         * @param root Root company to get employees
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        // Put code here
    }
}

export default CompanyResolvers;