import { IResolvers } from "graphql-tools";
import Company from "../entities/Company";
import Database from "../database/Database";
import Employee from "../entities/Employee";
import CompanyInput from "../inputTypes/CompanyInput";

const CompanyResolvers: IResolvers = {
    Query: {
        companies: (): Company[] => {
            return Database.companies.list();
        }
    },

    Company: {
        employees: (root: Company): Employee[] => Database.employees.list().filter(item => item.companyId == root.id)
    },

    Mutation: {
        createCompany:(_, args: { companyDetails: CompanyInput } ): Company => {

            const id = Database.employees.create({
                name: args.companyDetails.name,
                location: args.companyDetails.location,
            });
       
            return Database.companies.get(id);
        },

        updateCompany:(_, args: { id: string, companyDetails: CompanyInput }): Company => {

            const companyToUpdate = Database.companies.get(args.id);

            Database.companies.update(
                {
                    ...companyToUpdate,
                    ...args.companyDetails
                });
       
            return Database.companies.get(args.id);
        },

        deleteCompany:(_, args: { id: string }): Company => {

            const companyToDelete = Database.companies.get(args.id);

            Database.companies.delete(args.id);
       
            return companyToDelete;
        }
    }
}

export default CompanyResolvers;