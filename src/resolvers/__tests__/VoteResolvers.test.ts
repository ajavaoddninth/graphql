import Context from "../../context/Context";
import { Predicate } from "../../database/DataSource";
import Vote from "../../entities/Vote";
import UserInputError from "../../errors/UserInputError";
import { createMockContext, returns } from "../../__tests__/utils";
import VoteResolvers from "../VoteResolvers";

let context: Context;

beforeEach(() => {
    context = createMockContext();
});

describe("Query the vote of an employee for a poll", () => {
    beforeEach(() => {
        returns(
            context.votes.find,
            {
                id: "HyxeQEwV_w",
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuP"
            } as Vote
        );
    });

    it("should return a vote given a valid employee ID and poll ID", () => {
        const expectedResult = {
            id: "HyxeQEwV_w",
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuP"
        } as Vote;

        const actualResult = (VoteResolvers.Query as any).vote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.votes.find).toBeCalledWith(expect.any(Function));
    });

    it("should return undefined for non-existing vote", () => {
        returns(
            context.votes.find,
            undefined
        );

        const actualResult = (VoteResolvers.Query as any).vote(
            undefined,
            {
                employeeId: "EMP002",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(undefined);
    });

    it("should find with a predicate where a vote with employee ID and poll ID equal to the arguments returns true", () => {
        (VoteResolvers.Query as any).vote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeTruthy();
    });

    it("should find with a predicate where a vote with employee ID not equal to the argument returns false", () => {
        (VoteResolvers.Query as any).vote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP002",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });

    it("should find with a predicate where a vote with poll ID not equal to the argument returns false", () => {
        (VoteResolvers.Query as any).vote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_i",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });
});

describe("Send a vote", () => {
    beforeEach(() => {
        returns(
            context.employees.has,
            true
        );

        returns(
            context.polls.has,
            true
        );

        returns(
            context.pollOptions.has,
            true
        );

        returns(
            context.votes.create,
            (input: Partial<Vote>) => ({
                ...input,
                id: "HyxeQEwV_x"
            } as Vote)
        );

        returns(
            context.votes.find,
            {
                id: "HyxeQEwV_w",
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuP"
            } as Vote
        );
    });

    it("should delete old poll vote of employee, and create new one, and return new vote", () => {
        const expectedResult = {
            id: "HyxeQEwV_x",
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuQ"
        } as Vote;

        const actualResult = (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuQ");

        expect(context.votes.find).toBeCalledWith(expect.any(Function));

        expect(context.votes.delete).toBeCalledWith("HyxeQEwV_w");

        expect(context.votes.create).toBeCalledWith({
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuQ"
        });
    });

    it("should find old votes to delete using predicate where a vote with employee ID and poll ID equal to arguments returns true", () => {
        (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeTruthy();
    });

    it("should find old votes to delete using predicate where a vote with employee ID not equal to argument returns false", () => {
        (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP002",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });

    it("should find old votes to delete using predicate where a vote with poll ID not equal to argument returns false", () => {
        (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_u",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });

    it("should only create new vote, and return it when an old vote does not exist", () => {
        const expectedResult = {
            id: "HyxeQEwV_x",
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuQ"
        } as Vote;

        returns(
            context.votes.find,
            undefined
        );

        const actualResult = (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuQ");

        expect(context.votes.find).toBeCalledWith(expect.any(Function));

        expect(context.votes.delete).not.toBeCalled();

        expect(context.votes.create).toBeCalledWith({
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuQ"
        });
    });

    it("should throw an error given an invalid employee ID", () => {
        returns(
            context.employees.has,
            false
        );

        const action = () => (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP003",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a vote due to validation errors",
                {
                    employeeId: "No employee exists"
                }
            )
        );

        expect(context.employees.has).toBeCalledWith("EMP003");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuQ");

        expect(context.votes.find).not.toBeCalled();

        expect(context.votes.delete).not.toBeCalled();

        expect(context.votes.create).not.toBeCalled();
    });

    it("should throw an error given an invalid poll ID", () => {
        returns(
            context.polls.has,
            false
        );

        const action = () => (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_a",
                optionId: "SJSO-AQuQ"
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a vote due to validation errors",
                {
                    pollId: "No poll exists"
                }
            )
        );

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_a");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuQ");

        expect(context.votes.find).not.toBeCalled();

        expect(context.votes.delete).not.toBeCalled();

        expect(context.votes.create).not.toBeCalled();
    });

    it("should throw an error given an invalid poll option ID", () => {
        returns(
            context.pollOptions.has,
            false
        );

        const action = () => (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuA"
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a vote due to validation errors",
                {
                    optionId: "No option exists"
                }
            )
        );

        expect(context.employees.has).toBeCalledWith("EMP001");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuA");

        expect(context.votes.find).not.toBeCalled();

        expect(context.votes.delete).not.toBeCalled();

        expect(context.votes.create).not.toBeCalled();
    });

    it("should throw an error with all validation errors", () => {
        returns(
            context.employees.has,
            false
        );

        returns(
            context.polls.has,
            false
        );

        returns(
            context.pollOptions.has,
            false
        );

        const action = () => (VoteResolvers.Mutation as any).sendVote(
            undefined,
            {
                employeeId: "EMP003",
                pollId: "H1WO-AQ_a",
                optionId: "SJSO-AQuA"
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create a vote due to validation errors",
                {
                    employeeId: "No employee exists",
                    pollId: "No poll exists",
                    optionId: "No option exists"
                }
            )
        );

        expect(context.employees.has).toBeCalledWith("EMP003");

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_a");

        expect(context.pollOptions.has).toBeCalledWith("SJSO-AQuA");

        expect(context.votes.find).not.toBeCalled();

        expect(context.votes.delete).not.toBeCalled();

        expect(context.votes.create).not.toBeCalled();
    });
});

describe("Discard vote", () => {
    beforeEach(() => {
        returns(
            context.votes.find,
            {
                id: "HyxeQEwV_w",
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v",
                optionId: "SJSO-AQuP"
            } as Vote
        );
    });
    
    it("should delete a vote that matched the given employee ID and a poll ID", () => {
        const expectedResult = {
            id: "HyxeQEwV_w",
            employeeId: "EMP001",
            pollId: "H1WO-AQ_v",
            optionId: "SJSO-AQuP"
        } as Vote;

        const actualResult = (VoteResolvers.Mutation as any).discardVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.votes.find).toBeCalledWith(expect.any(Function));

        expect(context.votes.delete).toBeCalledWith("HyxeQEwV_w");
    });
    
    it("should not do anything if no votes matched", () => {
        returns(
            context.votes.find,
            undefined
        );
        
        const actualResult = (VoteResolvers.Mutation as any).discardVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(undefined);

        expect(context.votes.find).toBeCalledWith(expect.any(Function));

        expect(context.votes.delete).not.toBeCalled();
    });
    
    it("should find a vote to delete with a predicate where a vote with employee ID and poll ID equal to arguments returns true", () => {
        (VoteResolvers.Mutation as any).discardVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeTruthy();
    });
    
    it("should find a vote to delete with a predicate where a vote with employee ID not equal to argument returns false", () => {
        (VoteResolvers.Mutation as any).discardVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP003",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });
    
    it("should find a vote to delete with a predicate where a vote with poll ID not equal to argument returns false", () => {
        (VoteResolvers.Mutation as any).discardVote(
            undefined,
            {
                employeeId: "EMP001",
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.votes.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_a",
                    optionId: "SJSO-AQuP"
                } as Vote
            )
        ).toBeFalsy();
    });
});