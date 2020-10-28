import { IResolvers } from "graphql-tools";

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
         * [PART 1-02] Returns the GraphQL server components
         */
        // Put code here

        /**
         * [PART 1-03] Returns an integer type
         */
        // Put code here

        /**
         * [PART 1-03] Returns a float type
         */
        // Put code here

        /**
         * [PART 1-03] Returns a boolean type
         */
        // Put code here

        /**
         * [PART 1-03] Returns an ID type
         * (IDs are serialized as strings)
         */
        // Put code here

        /**
         * [PART 1-03] Returns an enumeration (JobGrade) type
         */
        // Put code here

        /**
         * [PART 1-03] Returns a list type
         */
        // Put code here
    }
};

export default BasicResolvers;
