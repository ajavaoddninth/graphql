import DataSource from "../database/DataSource";
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