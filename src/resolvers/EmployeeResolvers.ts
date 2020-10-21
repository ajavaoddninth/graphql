import { IResolvers } from "graphql-tools";
import Employee, { JobGrade } from "../entities/Employee";
import Database from "../database/Database";

const EmployeeResolvers: IResolvers = {
    Query: {
        employees: (): Employee[] => {
            return Database.employees.list();
        },

        employeeById: (_, args: { id: string }): Employee => {
            return Database.employees.get(args.id);
        },

        employeeByName: (_, args: { firstName: string }): Employee | undefined => {
            return Database.employees.list().find(item => item.firstName == args.firstName);
        },

        employeesTenureLessThan: (_, args: { tenure: number }): Employee[] => {
            return Database.employees.list().filter(item => item.tenure < args.tenure);
        },

        employeesByJobGrade: (_, args: { jobGrade: JobGrade }): Employee[] => {
            return Database.employees.list().filter(item => item.jobGrade == args.jobGrade);
        },

        employee:(_, args: { id: string, firstName: string }): Employee | undefined => {
            if (args.id){
                return Database.employees.get(args.id);
            }
            else if(args.firstName){
                return Database.employees.list().find(item => item.firstName == args.firstName);
            }
            else{
                return undefined;
            }
        }
    },

    Mutation: {
        createEmployee:(_, args): string => {
            return Database.employees.create({
                id:args.id,
                firstName:args.firstName,
                lastName:args.lastName
            })
        },

        createEmployeeReturnsObject:(_, args): Employee => {
            const id = Database.employees.create({
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
             })
       
             return Database.employees.get(id)
        }
    }
}

export default EmployeeResolvers;