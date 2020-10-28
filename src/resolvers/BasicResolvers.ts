import { IResolvers } from "graphql-tools";
import { JobGrade } from "../entities/Employee";

/**
 * Resolvers:
 *     - Each field in a GraphQL query is like a
 *       a function or method of a previous type which
 *       returns the next type
 *     - Resolver object structure looks like the schema
 *     - Resolver functions always receive four arguments in order
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
    // Resolver for Query type
    Query: {
        /**
         * Returns the string "Hello world!".
         * The four default arguments are not included
         * since they are not used in this resolver.
         * It is better not to included the arguments in
         * the resolver, or declare them with the name
         * `_` or any variable name that starts with `_`,
         * if they will be ignore.
         */
        helloWorld: (): string => {
            return "Hello world!";
        },

        /**
         * Returns the GraphQL server components
         */
        serverComponents: (): string => {
            return "The Query, The Schema, and The Resolver";
        },

        /**
         * Returns an integer type
         */
        thisIsAnInt: (): number => {
            return 19;
        },

        /**
         * Returns a float type
         */
        thisIsAFloat: (): number => {
            return 712.94;
        },

        /**
         * Returns a boolean type
         */
        thisIsABoolean: (): boolean => {
            return true;
        },

        /**
         * Returns an ID type
         * (IDs are serialized as strings)
         */
        thisIsAnId: (): string => {
            return "ID00001";
        },

        /**
         * Returns an enumeration type
         */
        thisIsAnEnum: (): JobGrade => {
            return JobGrade.M1;
        },
        
        /**
         * Returns a list type
         */
        thisIsAList: (): string[] => {
            return [ "Hello", "world", "!" ];
        }
    }
};

export default BasicResolvers;
