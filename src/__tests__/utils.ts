import Context from "../context/Context";
import DataSource from "../database/DataSource";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Poll from "../entities/Poll";
import PollOption from "../entities/PollOption";
import Vote from "../entities/Vote";

export function createMockDataSource<TEntity>(): DataSource<TEntity> {
    return {
        has: jest.fn(),
        get: jest.fn(),
        list: jest.fn(),
        count: jest.fn(),
        find: jest.fn(),
        filter: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
}

export function createMockContext(): Context {
    const companies: DataSource<Company> = createMockDataSource<Company>();
    
    const employees: DataSource<Employee> = createMockDataSource<Employee>();

    const polls: DataSource<Poll> = createMockDataSource<Poll>();

    const pollOptions: DataSource<PollOption> = createMockDataSource<PollOption>();

    const votes: DataSource<Vote> = createMockDataSource<Vote>();

    return {
        companies,
        employees,
        polls,
        pollOptions,
        votes
    };
}

export function returns(obj: any, returnValue: any) {
    const mockObj = obj as jest.Mock<any, any>;
    mockObj.mockReset();

    if (returnValue instanceof Function) {
        mockObj.mockImplementation(returnValue);
    }
    else {
        mockObj.mockReturnValue(returnValue);
    }
}