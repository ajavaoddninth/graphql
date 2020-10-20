import { Collection, DataStore } from 'notarealdb';
import Employee from '../entities/Employee';
import Company from '../entities/Company';

const store = new DataStore('./src/database');

const employees: Collection<Employee> = store.collection<Employee>('employees');
const companies: Collection<Company> = store.collection<Company>('companies');

export default {
    employees,
    companies
}