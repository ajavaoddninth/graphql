import { IResolvers, mergeResolvers } from "graphql-tools";
import Employee, { JobGrade } from "../entities/Employee";
import Company from "../entities/Company";
import Database from "../database/Database";

const SchemaResolver: IResolvers = {
    Query: {
        helloWorld: (): string => {
            return "Hello world!";
        },

        serverComponents: (): string => {
            return "The Query, The Schema, and The Resolver";
        },

        thisIsAnInt: (): number => {
            return 19;
        },

        thisIsAFloat: (): number => {
            return 712.94;
        },

        thisIsABoolean: (): boolean => {
            return true;
        },

        thisIsAnId: (): string => {
            return "ID00001";
        },

        employees: (): Employee[] => {
            return Database.employees.list();
        },

        companies: (): Company[] => {
            return Database.companies.list();
        },

        employeeById: (_, args: { id: string }) => {
            return Database.employees.get(args.id);
        },

        employeeByName: (_, args: { firstName: string }) => {
            return Database.employees.list().find(item => item.firstName == args.firstName)
            
        },

        employeesTenureLessThan: (_, args: { tenure: number }) => {
            return Database.employees.list().filter(item => item.tenure < args.tenure)
            
        },

        employeesByJobGrade: (_, args: { jobGrade: JobGrade }) => {
            return Database.employees.list().filter(item => item.jobGrade == args.jobGrade)
        },

        employee:(_, args: { id: string, firstName: string }) => {
            if (args.id){
                return Database.employees.get(args.id);
            }
            else if(args.firstName){
                return Database.employees.list().find(item => item.firstName == args.firstName);
            }
            else{
                return null
            }
        }
    },

    Company: {
        employees: (company: Company) => Database.employees.list().filter(item => item.companyId == company.id),
    }
}

export default mergeResolvers([ SchemaResolver ]);