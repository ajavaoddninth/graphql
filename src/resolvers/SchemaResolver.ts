import { IResolvers, mergeResolvers } from "graphql-tools";
import { JobGrade } from "../entities/Employee";
import VoteResolvers from "./VoteResolvers";
import CompanyResolvers from "./CompanyResolvers";
import EmployeeResolvers from "./EmployeeResolvers";
import PollOptionResolvers from "./PollOptionResolvers";
import PollResolvers from "./PollResolvers";
import { GraphQLDateTime } from "graphql-iso-date";

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
    },

    DateTime: GraphQLDateTime
};

export default mergeResolvers([ SchemaResolvers, CompanyResolvers, EmployeeResolvers, PollResolvers, PollOptionResolvers, VoteResolvers ]);