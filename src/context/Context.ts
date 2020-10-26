import { DataStore, Collection } from "notarealdb";
import CompanyDatabase from "../database/CompanyDatabase";
import DataSource from "../database/DataSource";
import EmployeeDatabase from "../database/EmployeeDatabase";
import PollDatabase from "../database/PollDatabase";
import PollOptionDatabase from "../database/PollOptionDatabase";
import VoteDatabase from "../database/VoteDatabase";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import PollOption from "../entities/PollOption";
import Vote from "../entities/Vote";

export default interface Context {
    companies: DataSource<Company>;
    employees: DataSource<Employee>;
    polls: DataSource<Poll>;
    pollOptions: DataSource<PollOption>;
    votes: DataSource<Vote>;
}

export function createContext(): Context {
    const store = new DataStore('./src/datastore');

    const companies: Collection<Company> = store.collection<Company>('companies');
    const employees: Collection<Employee> = store.collection<Employee>('employees');
    const polls: Collection<Poll> = store.collection<Poll>('polls');
    const pollOptions: Collection<PollOption> = store.collection<PollOption>('pollOptions');
    const votes: Collection<Vote> = store.collection<Vote>('votes');

    const voteDb = new VoteDatabase(votes);
    const pollOptionDb = new PollOptionDatabase(pollOptions, voteDb);
    const pollDb = new PollDatabase(polls, pollOptionDb, voteDb);
    const employeeDb = new EmployeeDatabase(employees, pollDb, voteDb);
    const companyDb = new CompanyDatabase(companies, employeeDb, pollDb);

    return {
        companies: companyDb,
        employees: employeeDb,
        polls: pollDb,
        pollOptions: pollOptionDb,
        votes: voteDb
    };
}