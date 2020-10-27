import { GraphQLDateTime } from "graphql-iso-date";
import { IResolvers, mergeResolvers } from "graphql-tools";
import BeginnerResolvers from "./BeginnerResolvers";
import CompanyResolvers from "./CompanyResolvers";
import EmployeeResolvers from "./EmployeeResolvers";
import PollOptionResolvers from "./PollOptionResolvers";
import PollResolvers from "./PollResolvers";
import VoteResolvers from "./VoteResolvers";

// Resolver for the custom scalar types.
// DO NOT MODIFY.
const CustomScalarResolvers: IResolvers = {
    DateTime: GraphQLDateTime
};

// Merge all defined resolvers into one big object.
// DO NOT MODIFY.
export default mergeResolvers([
    BeginnerResolvers,
    CompanyResolvers,
    EmployeeResolvers,
    PollResolvers,
    PollOptionResolvers,
    VoteResolvers,
    CustomScalarResolvers
]);