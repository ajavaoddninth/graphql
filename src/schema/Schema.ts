import { GraphQLSchema } from "graphql";
import { addResolversToSchema, GraphQLFileLoader, loadSchema } from "graphql-tools";
import SchemaResolver from "../resolvers/SchemaResolver";

export async function createSchema(): Promise<GraphQLSchema> {
    const typeDefs = await loadSchema(
        "./src/schema/*.graphql",
        {
            loaders: [
                new GraphQLFileLoader()
            ]
        }
    );

    return addResolversToSchema({
        schema: typeDefs,
        resolvers: SchemaResolver
    });
}