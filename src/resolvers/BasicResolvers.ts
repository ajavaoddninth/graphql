import { IResolvers } from "graphql-tools";
import { JobGrade } from "../entities/Employee";
import { GraphQLDateTime } from "graphql-iso-date";

/**
 * Resolvers:
 *     - Think of each field in a GraphQL query as
 *       a function or method of a previous type which
 *       returns the next type
 *     - Resolver object structure looks like the schema
 *     - Resolver functions always receive four arguments
 *       (which can be ignored):
 *           - `root`:    Previous/parent object, not used on
 *                            root types (Query/Mutation)
 *           - `args`:    Arguments provided to the field in the
 *                            query
 *           - `context`: Object common to all resolver functions,
 *                            holds contextual info like access to
 *                            databases and auth info
 *           - `info`:    Holds field-specific info (rarely used)
 *     - Read more: https://graphql.org/learn/execution/
 */
const BasicResolvers: IResolvers = {
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
        },
        
        thisIsAList: (): string[] => {
            return [ "Hello", "world", "!" ];
        }
    }
};

export default BasicResolvers;
