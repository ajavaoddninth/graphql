/**
 * Vote object type.
 * Fields in this object are trivial resolvers.
 */
export default interface Vote {
    id: string;
    employeeId: string;
    pollId: string;
    optionId: string;
} 