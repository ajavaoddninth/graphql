import express from "express";
import cors from "cors";
import compression from "compression";
import { graphqlHTTP } from "express-graphql";
import { createSchema } from "./schema/Schema";
import { createContext } from "./context/Context";
import formatError from "./errors/FormatError";

// The sample client is built with the assumption
// that the server is running on port 54321
const PORT = 54321;

/**
 * Main function for the GraphQL Server.
 */
const main = async () => {
    const app = express();

    const schema = await createSchema();

    const graphqlServer = graphqlHTTP(async () => ({
        schema,
        graphiql: true,
        context: createContext(),
        customFormatErrorFn: formatError
    }));

    app.use("*", cors());
    app.use(compression());
    app.use(
        "/graphql",
        graphqlServer
    );
    
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/graphql`);
    });
};

main();