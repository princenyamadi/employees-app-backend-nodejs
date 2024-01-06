import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";


// load environment variables from .env file, where the ATLAS_URI is configured

dotenv.config();


const {ATLAS_URI} = process.env;


if(!ATLAS_URI){
    console.log("No ATLAS_URI environmnent variable has been defined in config.env");

    process.exit(1);
}


connectToDatabase(ATLAS_URI).then(()=>{
    const app = express();
    app.use(cors());

    // start the Express server
    // app.listen(5200,()=>{
    //     console.log(`Server running at http:localhost:5200...`);
    // });
    app.use("/employees", employeeRouter);
}).catch(error => console.error(error));

// * to run the app use
// npx ts-node src/server.ts
