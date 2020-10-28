import { GraphQLDateTime } from "graphql-iso-date";
import { IResolvers, mergeResolvers } from "graphql-tools";
import BasicResolvers from "./BasicResolvers";
import CompanyResolvers from "./CompanyResolvers";
import EmployeeResolvers from "./EmployeeResolvers";
import PollOptionResolvers from "./PollOptionResolvers";
import PollResolvers from "./PollResolvers";
import VoteResolvers from "./VoteResolvers";

/**
 * Resolver for the custom scalar types
 */
const CustomScalarResolvers: IResolvers = {
    DateTime: GraphQLDateTime
};

/**
 * Resolver implementations can be separated across multiple objects
 * and then merged into one big schema resolvers object.
 */
export default mergeResolvers([
    BasicResolvers,
    CompanyResolvers,
    EmployeeResolvers,
    PollResolvers,
    PollOptionResolvers,
    VoteResolvers,
    CustomScalarResolvers
]);