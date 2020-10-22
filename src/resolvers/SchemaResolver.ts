import { IResolvers, mergeResolvers } from "graphql-tools";
import { JobGrade } from "../entities/Employee";
import CompanyResolvers from "./CompanyResolvers";
import EmployeeResolvers from "./EmployeeResolvers";
import SurveyResolvers from "./SurveyResolver";

const SchemaResolvers: IResolvers = {
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

        thisIsAnEnum: (): JobGrade => {
            return JobGrade.M1;
        }
    }
}

export default mergeResolvers([ SchemaResolvers, CompanyResolvers, EmployeeResolvers, SurveyResolvers ]);