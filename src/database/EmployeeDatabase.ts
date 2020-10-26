import { Collection } from "notarealdb";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

export default class EmployeeDatabase extends AbstractDatabase<Employee> {
    constructor(
        employees: Collection<Employee>,
        public pollDb: AbstractDatabase<Poll>,
        public voteDb: AbstractDatabase<Vote>
    ) {
        super(employees);
    }
    
    public delete(id: string): Employee {
        const employeeToDelete = this.rootCollection.get(id);

        this.rootCollection.delete(id);

        this.pollDb
            .filter(item => item.createdByEmployeeId === id)
            .map(item => this.pollDb.delete(item.id));

        this.voteDb
            .filter(item => item.employeeId === id)
            .map(item => this.voteDb.delete(item.id));

        return employeeToDelete;
    }
}