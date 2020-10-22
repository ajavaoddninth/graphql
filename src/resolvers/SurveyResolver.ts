import { IResolvers } from "graphql-tools";
import Database from "../database/Database";
import Question from "../entities/Question";
import Survey from "../entities/Survey";

const SurveyResolvers: IResolvers = {
    Query: {
        surveys: (): Survey[] => {
            return Database.surveys.list();
        },

        surveyByCompanyId: (_, args: { companyId: string }): Survey | undefined => {
            return Database.surveys.list().find(item => item.companyId == args.companyId);
        },
    },

    // Survey: {
    //     questions: (root: Survey): Question[] => Database.questions.list().filter(item => root.questionIds.includes(item.id))
    // },
}

export default SurveyResolvers;