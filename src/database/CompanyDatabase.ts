import { Collection } from "notarealdb";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import AbstractDatabase from "./AbstractDatabase";

export default class CompanyDatabase extends AbstractDatabase<Company> {
    constructor(
        companies: Collection<Company>,
        public employeeDb: AbstractDatabase<Employee>,
        public pollDb: AbstractDatabase<Poll>
    ) {
        super(companies);
    }
    
    public delete(id: string): Company {
        const companyToDelete = this.rootCollection.get(id);

        this.rootCollection.delete(id);

        this.employeeDb
            .filter(item => item.companyId === id)
            .map(item => this.employeeDb.delete(item.id));

        this.pollDb
            .filter(item => item.companyId === id)
            .map(item => this.pollDb.delete(item.id));

        return companyToDelete;
    }
}