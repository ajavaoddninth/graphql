/**
 * Poll object type.
 * Fields in this object that matches the fields in the schema
 * are trivial resolvers.
 * Read more: https://graphql.org/learn/execution/#trivial-resolvers
 */
export default interface Poll {
    id: string;
    companyId: string;
    title: string;
    createdByEmployeeId: string;
    createTime: Date;
} 