import { IResolvers } from "graphql-tools";
import Employee, { JobGrade } from "../entities/Employee";
import EmployeeInput from "../inputTypes/EmployeeInput";
import Context from "../context/Context";
import UserInputError from "../errors/UserInputError";

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Resolvers of fields related to employees
 */
const EmployeeResolvers: IResolvers = {
    // Resolvers for Query type
    Query: {
        /**
         * Returns all the working employees regardless
         * of company.
         * @param _ Ignored root object
         * @param __ Ignored argument object
         * @param context Context to access database
         */
        employees: (_, __, context: Context): Employee[] => {
            return context.employees.list();
        },

        /**
         * Returns a single employee by ID.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        employeeById: (_, args: { id: string }, context: Context): Employee | undefined => {
            return context.employees.get(args.id);
        },

        /**
         * [PART 1-06] Returns a single employee by full name,
         * if found.
         * @param _ Ignored root object
         * @param args Arguments containing full name
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 1-07] Returns all employees with tenure less than
         * provided year.
         * @param _ Ignored root object
         * @param args Arguments containing year
         * @param context Context to access database
         */
        // Put code here

        /**
         * Returns all employees with given job grade.
         * @param _ Ignored root object
         * @param args Arguments containing job grade
         * @param context Context to access database
         */
        employeesByJobGrade: (_, args: { jobGrade: JobGrade }, context: Context): Employee[] => {
            return context.employees.filter(item => item.jobGrade === args.jobGrade);
        },

        /**
         * [PART 1-09] Finds an employee using the ID or first name,
         * and returns it if found.
         * @param _ Ignored root object
         * @param args Arguments containing ID or first name
         * @param context Context to access database
         */
        // Put code here

        /**
         * [PART 2] Returns a single employee with given user name.
         * @param _ Ignored root object
         * @param args Arguments containing the user name
         * @param context Context to access database
         */
        // Put code here
    },

    // Resolvers for Mutation type
    Mutation: {
        /**
         * Creates an employee with given company ID and
         * other details, and returns it.
         * @param _ Ignored root object
         * @param args Arguments containing company ID and other details
         * @param context Context to access database
         */
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
                email: args.employeeDetails.email,
                userName: args.employeeDetails.userName
            });
        },

        /**
         * Updates an employee with given ID using the
         * given details, and returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID and update details
         * @param context Context to access database
         */
        updateEmployee: (_, args: { id: string, employeeDetails: EmployeeInput }, context: Context): Employee | undefined => {
            const validationErrors: { [key: string]: string } = {};
            
            // Validate employee ID
            if (!context.employees.has(args.id)) {
                validationErrors.id = "No employee exists";
            }
            
            // Validate email
            if (args.employeeDetails.email && !EMAIL_PATTERN.test(args.employeeDetails.email)) {
                validationErrors.email = "E-mail not in proper format";
            }

            if (Object.keys(validationErrors).length > 0) {
                throw new UserInputError(
                    "Failed to update an employee due to validation errors",
                    validationErrors);
            }
            
            return context.employees.update(args.id, args.employeeDetails);
        },

        /**
         * Deletes an employee with given ID, and
         * returns it if it exists.
         * @param _ Ignored root object
         * @param args Arguments containing ID
         * @param context Context to access database
         */
        deleteEmployee: (_, args: { id: string }, context: Context): Employee | undefined => {
            return context.employees.delete(args.id);
        }
    }
}

export default EmployeeResolvers;