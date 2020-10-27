import Context from "../../context/Context";
import { Comparer, Predicate } from "../../database/DataSource";
import Employee from "../../entities/Employee";
import Poll from "../../entities/Poll";
import UserInputError from "../../errors/UserInputError";
import { createMockContext, returns } from "../../__tests__/utils";
import PollResolvers from "../PollResolvers";

let context: Context;

beforeEach(() => {
    context = createMockContext();
});

describe("Query a list of polls under a company", () => {
    beforeEach(() => {
        returns(
            context.polls.filter,
            [
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll,
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Next code challenge organizer?",
                    createdByEmployeeId: "EMP001",
                    createTime: new Date("2020-10-26T04:32:41.225Z")
                } as Poll
            ]
        );
    });
    
    it("should return a list of polls given an ID of a company with polls", () => {
        const expectedResult = [
            {
                id: "H1WO-AQ_v",
                companyId: "CEL001",
                title: "Preferred vacation destination?",
                createdByEmployeeId: "EMP002",
                createTime: new Date("2020-10-26T04:32:42.225Z")
            } as Poll,
            {
                id: "H1WO-AQ_v",
                companyId: "CEL001",
                title: "Next code challenge organizer?",
                createdByEmployeeId: "EMP001",
                createTime: new Date("2020-10-26T04:32:41.225Z")
            } as Poll
        ];

        const actualResult = (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.polls.filter).toBeCalledWith(expect.any(Function), expect.any(Function));
    });

    it("should return an empty list given an ID of a company without any polls", () => {
        returns(
            context.polls.filter,
            []
        );

        const actualResult = (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL002"
            },
            context
        );

        expect(actualResult).toEqual([]);
    });

    it("should filter with a predicate where a poll with company ID equal to argument returns true", () => {
        (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        const predicate = (context.polls.filter as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Poll>;

        expect(
            predicate(
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll
            )
        ).toBeTruthy();
    });

    it("should filter with a predicate where a poll with company ID not equal to argument returns false", () => {
        (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        const predicate = (context.polls.filter as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Poll>;

        expect(
            predicate(
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL002",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll
            )
        ).toBeFalsy();
    });

    it("should sort polls with a comparer that returns negative if a poll's created date is greater than another", () => {
        (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        const comparer = (context.polls.filter as jest.Mock<any, any>).mock.calls[0][1] as Comparer<Poll>;

        expect(
            comparer(
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:43.225Z")
                } as Poll,
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll
            )
        ).toBeLessThan(0);
    });

    it("should sort polls with a comparer that returns positive if a poll's created date is less than another", () => {
        (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        const comparer = (context.polls.filter as jest.Mock<any, any>).mock.calls[0][1] as Comparer<Poll>;

        expect(
            comparer(
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll,
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:43.225Z")
                } as Poll
            )
        ).toBeGreaterThan(0);
    });

    it("should sort polls with a comparer that returns zero if a poll's created date is equal to another", () => {
        (PollResolvers.Query as any).pollsByCompanyId(
            undefined,
            {
                companyId: "CEL001"
            },
            context
        );

        const comparer = (context.polls.filter as jest.Mock<any, any>).mock.calls[0][1] as Comparer<Poll>;

        expect(
            comparer(
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll,
                {
                    id: "H1WO-AQ_v",
                    companyId: "CEL001",
                    title: "Preferred vacation destination?",
                    createdByEmployeeId: "EMP002",
                    createTime: new Date("2020-10-26T04:32:42.225Z")
                } as Poll
            )
        ).toBe(0);
    });
});

describe("Query the employee who created the poll", () => {
    it("should return the employee who created the poll", () => {
        const root = {
            id: "H1WO-AQ_v",
            companyId: "CEL001",
            title: "Next code challenge organizer?",
            createdByEmployeeId: "EMP001",
            createTime: new Date("2020-10-26T04:32:41.225Z")
        } as Poll;

        const expectedResult = {
            id: "EMP001",
            firstName:"Nick",
            lastName:"Schrock",
            email: "Nick.Schrock@canon-europe.com",
            weight: 75.9,
            tenure: 15,
            isWfh: true,
            jobGrade: "Manager",
            companyId: "CEL001",
            userName: "nick.schrock"
        } as Employee;

        returns(
            context.employees.get,
            expectedResult
        );

        const actualResult = (PollResolvers.Poll as any).createdByEmployee(
            root,
            undefined,
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.employees.get).toBeCalledWith("EMP001");
    });
});

describe("Create a poll", () => {
    beforeEach(() => {
        returns(
            context.companies.has,
            true
        );

        returns(
            context.employees.has,
            true
        );

        returns(
            context.polls.create,
            (input: Partial<Poll>) => ({
                ...input,
                id: "H1WO-AQ_v"
            } as Poll)
        );
    });

    it("should create a poll given a valid company ID, employee ID and title", () => {
        const expectedResult = {
            id: "H1WO-AQ_v",
            companyId: "CEL001",
            title: "Next code challenge organizer?",
            createdByEmployeeId: "EMP001",
            createTime: expect.any(Date)
        } as Poll;
        
        const actualResult = (PollResolvers.Mutation as any).createPoll(
            undefined,
            {
                companyId: "CEL001",
                title: "Next code challenge organizer?",
                createdByEmployeeId: "EMP001",
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.companies.has).toBeCalledWith("CEL001");

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.create).toBeCalledWith({
            companyId: "CEL001",
            title: "Next code challenge organizer?",
            createdByEmployeeId: "EMP001",
            createTime: expect.any(Date)
        });
    });

    it("should throw an error given an invalid company ID", () => {
        returns(
            context.companies.has,
            false
        );
        
        const action = () => (PollResolvers.Mutation as any).createPoll(
            undefined,
            {
                companyId: "CEL003",
                title: "Next code challenge organizer?",
                createdByEmployeeId: "EMP001",
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a poll due to validation errors",
                {
                    companyId: "No company exists"
                }));

        expect(context.companies.has).toBeCalledWith("CEL003");

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.create).not.toBeCalled();
    });

    it("should throw an error given an invalid employee ID", () => {
        returns(
            context.employees.has,
            false
        );
        
        const action = () => (PollResolvers.Mutation as any).createPoll(
            undefined,
            {
                companyId: "CEL001",
                title: "Next code challenge organizer?",
                createdByEmployeeId: "EMP003",
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a poll due to validation errors",
                {
                    createdByEmployeeId: "No employee exists"
                }));

        expect(context.companies.has).toBeCalledWith("CEL001");

        expect(context.employees.has).toBeCalledWith("EMP003");

        expect(context.polls.create).not.toBeCalled();
    });

    it("should throw an error given an empty title", () => {
        const action = () => (PollResolvers.Mutation as any).createPoll(
            undefined,
            {
                companyId: "CEL001",
                title: "",
                createdByEmployeeId: "EMP001",
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a poll due to validation errors",
                {
                    title: "Poll title should not be empty"
                }));

        expect(context.companies.has).toBeCalledWith("CEL001");

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.create).not.toBeCalled();
    });

    it("should throw an error with all validation errors", () => {
        returns(
            context.companies.has,
            false
        );

        returns(
            context.employees.has,
            false
        );
        
        const action = () => (PollResolvers.Mutation as any).createPoll(
            undefined,
            {
                companyId: "CEL003",
                title: "",
                createdByEmployeeId: "EMP003",
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a poll due to validation errors",
                {
                    companyId: "No company exists",
                    title: "Poll title should not be empty",
                    createdByEmployeeId: "No employee exists"
                }));

        expect(context.companies.has).toBeCalledWith("CEL003");

        expect(context.employees.has).toBeCalledWith("EMP003");

        expect(context.polls.create).not.toBeCalled();
    });
});

describe("Delete a poll", () => {
    it("should delete a poll and return it", () => {
        const expectedResult = {
            id: "H1WO-AQ_v",
            companyId: "CEL001",
            title: "Next code challenge organizer?",
            createdByEmployeeId: "EMP001",
            createTime: expect.any(Date)
        } as Poll;

        returns(
            context.polls.delete,
            expectedResult
        );

        const actualResult = (PollResolvers.Mutation as any).deletePoll(
            undefined,
            {
                id: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.polls.delete).toBeCalledWith("H1WO-AQ_v");
    });
});