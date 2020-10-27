import Context from "../../context/Context";
import { Predicate } from "../../database/DataSource";
import PollOption from "../../entities/PollOption";
import Vote from "../../entities/Vote";
import UserInputError from "../../errors/UserInputError";
import { createMockContext, returns } from "../../__tests__/utils";
import PollOptionResolvers from "../PollOptionResolvers";

let context: Context;

beforeEach(() => {
    context = createMockContext();
});

describe("Query options in a given poll", () => {
    beforeEach(() => {
        returns(
            context.pollOptions.filter,
            [
                {
                    id: "SJSO-AQuP",
                    pollId: "H1WO-AQ_v",
                    option: "Yes"
                } as PollOption,
                {
                    id: "Hy_uZCQuD",
                    pollId: "H1WO-AQ_v",
                    option: "No"
                } as PollOption,
                {
                    id: "rJ2u-Am_w",
                    pollId: "H1WO-AQ_v",
                    option: "Maybe"
                } as PollOption
            ]
        );
    });

    it("should return a list of options given an ID of a poll with options", () => {
        const expectedResult = [
            {
                id: "SJSO-AQuP",
                pollId: "H1WO-AQ_v",
                option: "Yes"
            } as PollOption,
            {
                id: "Hy_uZCQuD",
                pollId: "H1WO-AQ_v",
                option: "No"
            } as PollOption,
            {
                id: "rJ2u-Am_w",
                pollId: "H1WO-AQ_v",
                option: "Maybe"
            } as PollOption
        ];

        const actualResult = (PollOptionResolvers.Query as any).optionsByPollId(
            undefined,
            {
                pollId: "H1WO-AQ_v"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.pollOptions.filter).toBeCalledWith(expect.any(Function));
    });

    it("should return an empty list given an ID of a poll without any options", () => {
        returns(
            context.pollOptions.filter,
            []
        );

        const actualResult = (PollOptionResolvers.Query as any).optionsByPollId(
            undefined,
            {
                pollId: "H1WO-AQ_i"
            },
            context
        );

        expect(actualResult).toEqual([]);
    });

    it("should filter with a predicate where a poll option with poll ID equal to argument returns true", () => {
        (PollOptionResolvers.Query as any).optionsByPollId(
            undefined,
            {
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.pollOptions.filter as jest.Mock<any, any>).mock.calls[0][0] as Predicate<PollOption>;

        expect(
            predicate(
                {
                    id: "SJSO-AQuP",
                    pollId: "H1WO-AQ_v",
                    option: "Yes"
                } as PollOption
            )
        ).toBeTruthy();
    });

    it("should filter with a predicate where a poll option with poll ID not equal to argument returns false", () => {
        (PollOptionResolvers.Query as any).optionsByPollId(
            undefined,
            {
                pollId: "H1WO-AQ_v"
            },
            context
        );

        const predicate = (context.pollOptions.filter as jest.Mock<any, any>).mock.calls[0][0] as Predicate<PollOption>;

        expect(
            predicate(
                {
                    id: "SJSO-AQuP",
                    pollId: "H1WO-AQ_i",
                    option: "Yes"
                } as PollOption
            )
        ).toBeFalsy();
    });
});

describe("Query tally of votes for an option", () => {
    beforeEach(() => {
        returns(
            context.votes.count,
            3
        );
    });
    
    it("should return vote count for a given option", () => {
        const root = {
            id: "SJSO-AQuP",
            pollId: "H1WO-AQ_i",
            option: "Yes"
        } as PollOption;
        
        const actualResult = (PollOptionResolvers.PollOption as any).tally(
            root,
            undefined,
            context
        );

        expect(actualResult).toBe(3);

        expect(context.votes.count).toBeCalledWith(expect.any(Function));
    });

    it("should count with a predicate where a vote with option ID equals root ID returns true", () => {
        const root = {
            id: "SJSO-AQuP",
            pollId: "H1WO-AQ_i",
            option: "Yes"
        } as PollOption;
        
        (PollOptionResolvers.PollOption as any).tally(
            root,
            undefined,
            context
        );

        const predicate = (context.votes.count as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

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

    it("should count with a predicate where a vote with option ID not equal to root ID returns false", () => {
        const root = {
            id: "SJSO-AQuP",
            pollId: "H1WO-AQ_i",
            option: "Yes"
        } as PollOption;
        
        (PollOptionResolvers.PollOption as any).tally(
            root,
            undefined,
            context
        );

        const predicate = (context.votes.count as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Vote>;

        expect(
            predicate(
                {
                    id: "HyxeQEwV_w",
                    employeeId: "EMP001",
                    pollId: "H1WO-AQ_v",
                    optionId: "SJSO-AQuQ"
                } as Vote
            )
        ).toBeFalsy();
    });
});

describe("Create a poll option", () => {
    beforeEach(() => {
        returns(
            context.polls.has,
            true
        );

        returns(
            context.pollOptions.create,
            (input: Partial<PollOption>) => ({
                ...input,
                id: "SJSO-AQuP"
            } as PollOption)
        );
    });

    it("should create a poll option given a valid poll ID and option string", () => {
        const expectedResult = {
            id: "SJSO-AQuP",
            pollId: "H1WO-AQ_i",
            option: "Yes"
        } as PollOption;

        const actualResult = (PollOptionResolvers.Mutation as any).createPollOption(
            undefined,
            {
                pollId: "H1WO-AQ_i",
                option: "Yes"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_i");

        expect(context.pollOptions.create).toBeCalledWith({
            pollId: "H1WO-AQ_i",
            option: "Yes"
        });
    });

    it("should throw an error given an invalid poll ID", () => {
        returns(
            context.polls.has,
            false
        );

        const action = () => (PollOptionResolvers.Mutation as any).createPollOption(
            undefined,
            {
                pollId: "H1WO-AQ_v",
                option: "Yes"
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create an option due to validation errors",
                {
                    pollId: "No poll exists"
                }
            )
        );

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.create).not.toBeCalled();
    });

    it("should throw an error given an invalid option string", () => {
        const action = () => (PollOptionResolvers.Mutation as any).createPollOption(
            undefined,
            {
                pollId: "H1WO-AQ_i",
                option: ""
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create an option due to validation errors",
                {
                    option: "Option should not be empty"
                }
            )
        );

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_i");

        expect(context.pollOptions.create).not.toBeCalled();
    });

    it("should throw an error with all validation errors", () => {
        returns(
            context.polls.has,
            false
        );

        const action = () => (PollOptionResolvers.Mutation as any).createPollOption(
            undefined,
            {
                pollId: "H1WO-AQ_v",
                option: ""
            },
            context
        );

        expect(action).toThrowError(
            new UserInputError(
                "Failed to create an option due to validation errors",
                {
                    pollId: "No poll exists",
                    option: "Option should not be empty"
                }
            )
        );

        expect(context.polls.has).toBeCalledWith("H1WO-AQ_v");

        expect(context.pollOptions.create).not.toBeCalled();
    });
});

describe("Delete a poll option", () => {
    it("should delete a poll option and return it", () => {
        const expectedResult = {
            id: "SJSO-AQuP",
            pollId: "H1WO-AQ_i",
            option: "Yes"
        } as PollOption;

        returns(
            context.pollOptions.delete,
            expectedResult
        );

        const actualResult = (PollOptionResolvers.Mutation as any).deletePollOption(
            undefined,
            {
                id: "SJSO-AQuP"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.pollOptions.delete).toBeCalledWith("SJSO-AQuP");
    });
});