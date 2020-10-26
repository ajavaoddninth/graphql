import { IResolvers } from "graphql-tools";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import CompanyInput from "../inputTypes/CompanyInput";
import Context from "../context/Context";

const CompanyResolvers: IResolvers = {
    Query: {
        companies: (_, __, context: Context): Company[] => {
            return context.companies.list();
        },

        company: (_, args: { id: string }, context: Context): Company => {
            return context.companies.get(args.id);
        }
    },

    Mutation: {
        createCompany: (_, args: { companyDetails: CompanyInput }, context: Context): Company => {
            return context.companies.create({
                name: args.companyDetails.name,
                location: args.companyDetails.location
            });
        },

        updateCompany: (_, args: { id: string, companyDetails: CompanyInput }, context: Context): Company => {
            return context.companies.update(args.id, args.companyDetails);
        },

        deleteCompany: (_, args: { id: string }, context: Context): Company => {
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