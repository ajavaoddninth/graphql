import express from "express";
import cors from "cors";
import compression from "compression";
import { graphqlHTTP } from "express-graphql";
import { createSchema } from "./schema/Schema";

const main = async () => {
    const app = express();

    const schema = await createSchema();

    const graphqlServer = graphqlHTTP({
        schema,
        graphiql: true
    });

    app.use("*", cors());
    app.use(compression());
    app.use(
        "/graphql",
        graphqlServer
    );
    
    app.listen(4000, () => {
        console.log(`Server started on http://localhost:4000/graphql`);
    });
};

main();