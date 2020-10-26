import express from "express";
import cors from "cors";
import compression from "compression";
import { graphqlHTTP } from "express-graphql";
import { createSchema } from "./schema/Schema";
import { Collection, DataStore } from "notarealdb";
import Company from "./entities/Company";
import Employee from "./entities/Employee";
import Poll from "./entities/Poll";
import PollOption from "./entities/PollOption";
import Vote from "./entities/Vote";
import Context from "./context/Context";
import VoteDatabase from "./database/VoteDatabase";
import PollOptionDatabase from "./database/PollOptionDatabase";
import PollDatabase from "./database/PollDatabase";
import EmployeeDatabase from "./database/EmployeeDatabase";
import CompanyDatabase from "./database/CompanyDatabase";

const main = async () => {
    const app = express();

    const schema = await createSchema();

    const graphqlServer = graphqlHTTP(async () => {
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

        const context: Context = {
            companies: companyDb,
            employees: employeeDb,
            polls: pollDb,
            pollOptions: pollOptionDb,
            votes: voteDb
        };
        
        return {
            schema,
            graphiql: true,
            context
        };
    });

    app.use("*", cors());
    app.use(compression());
    app.use(
        "/graphql",
        graphqlServer
    );
    
    app.listen(4000, () => {
        console.log(`Server started on http://localhost:4000/graphql`);
    });
};

main();