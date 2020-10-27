import Context from "../../context/Context";
import { Predicate } from "../../database/DataSource";
import Employee from "../../entities/Employee";
import { createMockContext, returns } from "../../__tests__/utils";
import EmployeeResolvers from "../EmployeeResolvers";

let context: Context;

beforeEach(() => {
    context = createMockContext();
});

describe("Query an employee by user name", () => {
    beforeEach(() => {
        returns(
            context.employees.find,
            {
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
            } as Employee);
    });

    it("should return an employee given a valid user name", () => {
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

        const actualResult = (EmployeeResolvers.Query as any).employeeByUserName(
            undefined,
            {
                userName: "nick.schrock"
            },
            context
        );

        expect(actualResult).toEqual(expectedResult);

        expect(context.employees.find).toBeCalledWith(expect.any(Function));
    });

    it("should throw an error given an invalid user name", () => {
        returns(
            context.employees.find,
            undefined);

        expect(() => 
            (EmployeeResolvers.Query as any).employeeByUserName(
                undefined,
                {
                    userName: "invalid.userName"
                },
                context
            )
        ).toThrowError("Invalid username");
    });

    it("should find with a predicate where an employee with user name equal to argument returns true", () => {
        (EmployeeResolvers.Query as any).employeeByUserName(
            undefined,
            {
                userName: "nick.schrock"
            },
            context
        );

        const predicate = (context.employees.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Employee>;
    
        expect(
            predicate(
                {
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
                } as Employee
            )
        ).toBeTruthy();
    });

    it("should find with a predicate where an employee with user name not equal to argument returns false", () => {
        (EmployeeResolvers.Query as any).employeeByUserName(
            undefined,
            {
                userName: "nick.schrock"
            },
            context
        );

        const predicate = (context.employees.find as jest.Mock<any, any>).mock.calls[0][0] as Predicate<Employee>;
    
        expect(
            predicate(
                {
                    id: "EMP002",
                    firstName:"Wick",
                    lastName:"Schrock",
                    email: "Wick.Schrock@canon-europe.com",
                    weight: 75.9,
                    tenure: 15,
                    isWfh: true,
                    jobGrade: "Manager",
                    companyId: "CEL001",
                    userName: "wick.schrock"
                } as Employee
            )
        ).toBeFalsy();
    });
});