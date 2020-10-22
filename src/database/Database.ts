import { Collection, DataStore } from 'notarealdb';
import Employee from '../entities/Employee';
import Company from '../entities/Company';
import Survey from '../entities/Survey';
import Question from '../entities/Question';

const store = new DataStore('./src/database');

const employees: Collection<Employee> = store.collection<Employee>('employees');
const companies: Collection<Company> = store.collection<Company>('companies');
const surveys: Collection<Survey> = store.collection<Survey>('surveys');
const questions: Collection<Question> = store.collection<Question>('questions');

export default {
    employees,
    companies,
    surveys,
    questions
}