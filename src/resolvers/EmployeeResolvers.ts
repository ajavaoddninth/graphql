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

            // Validate employee ID
            if (args.id == undefined) {
                throw new Error("Cannot create an employee with null ID")
            }

            const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail =  emailPattern.test(String(args.email).toLowerCase())
            
            // Validate email
            if(!isValidEmail) {
                throw new Error("email not in proper format")
            }
            
            const id = Database.employees.create({
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
                companyId: args.companyId,
                email: args.email
             })
       
             return Database.employees.get(id)
        }
    }
}

export default EmployeeResolvers;