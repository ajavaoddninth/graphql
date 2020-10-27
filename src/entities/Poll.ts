/**
 * Poll object type.
 * Fields in this object are trivial resolvers.
 */
export default interface Poll {
    id: string;
    companyId: string;
    title: string;
    createdByEmployeeId: string;
    createTime: Date;
} 