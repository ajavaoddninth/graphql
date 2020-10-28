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
         * Creates a single company from the given details,
         * and returns it.
         * @param _ Ignored root object
         * @param args Argument containing the company details
         * @param context Context to access database
         */
        createCompany: (_, args: { companyDetails: CompanyInput }, context: Context): Company => {
            const validationErrors: { [key: string]: string } = {};

            // Validate company name
            if (!args.companyDetails.name) {
                validationErrors.name = "Company name should not be empty";
            }

            // Validate company location
            if (!args.companyDetails.location) {
                validationErrors.location = "Company location should not be empty";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to create a company due to validation errors",
                    validationErrors);
            }
            
            return context.companies.create({
                name: args.companyDetails.name,
                location: args.companyDetails.location
            });
        },

        /**
         * Updates a company with given ID using the
         * given details, and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing ID and update details
         * @param context Context to access database
         */
        updateCompany: (_, args: { id: string, companyDetails: CompanyInput }, context: Context): Company | undefined => {
            const validationErrors: { [key: string]: string } = {};

            // Validate company ID
            if (!context.companies.has(args.id)) {
                validationErrors.id = "No company exists";
            }

            // Validate company name
            if (!args.companyDetails.name) {
                validationErrors.name = "Company name should not be empty";
            }

            // Validate company location
            if (!args.companyDetails.location) {
                validationErrors.location = "Company location should not be empty";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to update a company due to validation errors",
                    validationErrors);
            }
            
            return context.companies.update(args.id, args.companyDetails);
        },

        /**
         * Deletes a company with given ID, and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        deleteCompany: (_, args: { id: string }, context: Context): Company | undefined => {
            return context.companies.delete(args.id);
        }
    },

    // Resolver for Company type
    Company: {
        /**
         * Returns the employees under a given company.
         * @param root Root company to get employees
         * @param _ Ignored argument object
         * @param context Context to access database
         */
        employees: (root: Company, _, context: Context): Employee[] => {
            return context.employees.filter(item => item.companyId == root.id);
        }
    }
}

export default CompanyResolvers;