import { IResolvers } from "graphql-tools";
import Company from "../entities/Company";
import Database from "../database/Database";
import Employee from "../entities/Employee";

const CompanyResolvers: IResolvers = {
    Query: {
        companies: (): Company[] => {
            return Database.companies.list();
        }
    },

    Company: {
        employees: (root: Company): Employee[] => Database.employees.list().filter(item => item.companyId == root.id)
    }
}

export default CompanyResolvers;