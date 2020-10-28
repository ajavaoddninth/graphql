import { GraphQLDateTime } from "graphql-iso-date";
import { IResolvers, mergeResolvers } from "graphql-tools";
import BasicResolvers from "./BasicResolvers";
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

// Merge all defined resolvers into one big schema resolver.
// DO NOT MODIFY.
export default mergeResolvers([
    BasicResolvers,
    CompanyResolvers,
    EmployeeResolvers,
    PollResolvers,
    PollOptionResolvers,
    VoteResolvers,
    CustomScalarResolvers
]);