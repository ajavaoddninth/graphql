/**
 * Poll option object type.
 * Fields in this object that matches the fields in the schema
 * are trivial resolvers.
 * Read more: https://graphql.org/learn/execution/#trivial-resolvers
 */
export default interface PollOption {
    id: string;
    option: string;
    pollId: string;
}