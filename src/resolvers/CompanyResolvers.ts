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
    Query: {
        companies: (_, __, context: Context): Company[] => {
            return context.companies.list();
        },

        company: (_, args: { id: string }, context: Context): Company | undefined => {
            return context.companies.get(args.id);
        }
    },

    Mutation: {
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

        deleteCompany: (_, args: { id: string }, context: Context): Company | undefined => {
            return context.companies.delete(args.id);
        }
    },

    Company: {
        employees: (root: Company, _, context: Context): Employee[] => {
            return context.employees.filter(item => item.companyId == root.id);
        }
    }
}

export default CompanyResolvers;