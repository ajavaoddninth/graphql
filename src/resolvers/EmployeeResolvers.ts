import { IResolvers } from "graphql-tools";
import Employee, { JobGrade } from "../entities/Employee";
import EmployeeInput from "../inputTypes/EmployeeInput";
import Context from "../context/Context";
import UserInputError from "../errors/UserInputError";

const EMAIL_PATTERN = /^(?:i)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Resolvers of fields related to employees
 */
const EmployeeResolvers: IResolvers = {
    Query: {
        employees: (_, __, context: Context): Employee[] => {
            return context.employees.list();
        },

        employeeById: (_, args: { id: string }, context: Context): Employee | undefined => {
            return context.employees.get(args.id);
        },

        employeeByName: (_, args: { name: string }, context: Context): Employee | undefined => {
            return context.employees.find(item => `${item.firstName} ${item.lastName}` === args.name);
        },

        employeesTenureLessThan: (_, args: { tenure: number }, context: Context): Employee[] => {
            return context.employees.filter(item => item.tenure < args.tenure);
        },

        employeesByJobGrade: (_, args: { jobGrade: JobGrade }, context: Context): Employee[] => {
            return context.employees.filter(item => item.jobGrade === args.jobGrade);
        },

        employee:(_, args: { id: string, firstName: string }, context: Context): Employee | undefined => {
            if (args.id) {
                return context.employees.get(args.id);
            }
            else if (args.firstName) {
                return context.employees.find(item => item.firstName === args.firstName);
            }
            else {
                return undefined;
            }
        },

        employeeByUserName: (_, args: { userName: string }, context: Context): Employee => {
            const employee = context.employees.find(item => item.userName === args.userName);

            if (employee === undefined) {
                throw new Error("Invalid username");
            }

            return employee;
        },
    },

    Mutation: {
        createEmployee: (_, args: { companyId: string, employeeDetails: EmployeeInput }, context: Context): Employee => {
            const validationErrors: { [key: string]: string } = {};
            
            // Validate company ID
            if (!context.companies.has(args.companyId)) {
                validationErrors.companyId = "No company exists";
            }

            // Validate first name
            if (!args.employeeDetails.firstName) {
                validationErrors.firstName = "First name should not be empty";
            }

            // Validate last name
            if (!args.employeeDetails.lastName) {
                validationErrors.lastName = "Last name should not be empty";
            }
            
            // Validate email
            if (!EMAIL_PATTERN.test(args.employeeDetails.email)) {
                validationErrors.email = "E-mail not in proper format";
            }

            // Validate user name
            if (!args.employeeDetails.userName) {
                validationErrors.userName = "User name should not be empty";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to create an employee due to validation errors",
                    validationErrors);
            }
            
            return context.employees.create({
                firstName: args.employeeDetails.firstName,
                lastName: args.employeeDetails.lastName,
                companyId: args.companyId,
                email: args.employeeDetails.email
            });
        },

        updateEmployee: (_, args: { id: string, employeeDetails: EmployeeInput }, context: Context): Employee | undefined => {
            const validationErrors: { [key: string]: string } = {};
            
            // Validate employee ID
            if (!context.employees.has(args.id)) {
                validationErrors.id = "No employee exists";
            }

            // Validate first name
            if (!args.employeeDetails.firstName) {
                validationErrors.firstName = "First name should not be empty";
            }

            // Validate last name
            if (!args.employeeDetails.lastName) {
                validationErrors.lastName = "Last name should not be empty";
            }
            
            // Validate email
            if (!EMAIL_PATTERN.test(args.employeeDetails.email)) {
                validationErrors.email = "E-mail not in proper format";
            }

            // Validate user name
            if (!args.employeeDetails.userName) {
                validationErrors.userName = "User name should not be empty";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to update an employee due to validation errors",
                    validationErrors);
            }
            
            return context.employees.update(args.id, args.employeeDetails);
        },

        deleteEmployee: (_, args: { id: string }, context: Context): Employee | undefined => {
            return context.employees.delete(args.id);
        }
    }
}

export default EmployeeResolvers;