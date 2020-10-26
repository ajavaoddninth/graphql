import { IResolvers } from "graphql-tools";
import Employee, { JobGrade } from "../entities/Employee";
import EmployeeInput from "../inputTypes/EmployeeInput";
import Context from "../context/Context";

const EmployeeResolvers: IResolvers = {
    Query: {
        employees: (_, __, context: Context): Employee[] => {
            return context.employees.list();
        },

        employeeById: (_, args: { id: string }, context: Context): Employee => {
            return context.employees.get(args.id);
        },

        employeeByName: (_, args: { name: string }, context: Context): Employee | undefined => {
            return context.employees.find(item => `${item.firstName} ${item.lastName}` == args.name);
        },

        employeesTenureLessThan: (_, args: { tenure: number }, context: Context): Employee[] => {
            return context.employees.filter(item => item.tenure < args.tenure);
        },

        employeesByJobGrade: (_, args: { jobGrade: JobGrade }, context: Context): Employee[] => {
            return context.employees.filter(item => item.jobGrade == args.jobGrade);
        },

        employee:(_, args: { id: string, firstName: string }, context: Context): Employee | undefined => {
            if (args.id) {
                return context.employees.get(args.id);
            }
            else if (args.firstName) {
                return context.employees.find(item => item.firstName == args.firstName);
            }
            else {
                return undefined;
            }
        },

        employeeByUserName: (_, args: { userName: string }, context: Context): Employee => {
            const employee = context.employees.find(item => item.userName == args.userName);

            if (employee === undefined) {
                throw new Error("Invalid username");
            }

            return employee;
        },
    },

    Mutation: {
        createEmployee: (_, args: { companyId: string, employeeDetails: EmployeeInput }, context: Context): Employee => {

            const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail =  emailPattern.test(String(args.employeeDetails.email).toLowerCase());
            
            // Validate email
            if (!isValidEmail) {
                throw new Error("email not in proper format");
            }
            
            return context.employees.create({
                firstName: args.employeeDetails.firstName,
                lastName: args.employeeDetails.lastName,
                companyId: args.companyId,
                email: args.employeeDetails.email
            });
        },

        updateEmployee: (_, args: { id: string, employeeDetails: EmployeeInput }, context: Context): Employee => {

            const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail =  emailPattern.test(String(args.employeeDetails.email).toLowerCase());
            
            // Validate email
            if (!isValidEmail) {
                throw new Error("email not in proper format");
            }
            
            return context.employees.update(args.id, args.employeeDetails);
        },

        deleteEmployee: (_, args: { id: string }, context: Context): Employee => {
            return context.employees.delete(args.id);
        }
    }
}

export default EmployeeResolvers;