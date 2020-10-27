/**
 * Employee object type.
 * Fields in this object are trivial resolvers.
 * Read more: https://graphql.org/learn/execution/#trivial-resolvers
 */
export default interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyId: string;
    weight: number;
    tenure: number;
    isWfh: boolean;
    jobGrade: JobGrade;
    userName: string;
} 

/**
 * JobGrade enumeration type.
 */
export enum JobGrade {
    M1 = 'Manager',
    G4 = 'PrincipalEngineer',
    G3 = 'SeniorEngineer',
    G2 = 'JuniorEngineer',
    G1 = 'CuteEngineer',
}