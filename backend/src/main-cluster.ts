import { fork, isMaster } from 'cluster';
import { cpus } from 'os';
import { Logger } from "@nestjs/common";
import { program } from 'commander';
import * as dotenv from 'dotenv';
import { build } from './build-bdd';

if (isMaster) {
    dotenv.config();
    const logger = new Logger("Main cluster");

    program.version('2.0');
    program
        .option("-b, --build-db", "Build the database");
    program.parse(process.argv);

    const checkVariable = variable => {
        if (typeof process.env[variable] !== "string") {
            const msg = `Please be a good developer and provide the environment variable [${variable}]!`;
            logger.error(msg);
            process.exit(1);
        }
    };

    checkVariable("mongo_connection");

    if (program.buildDb) {
        build()
            .then(() => { console.log("BDD build"); })
            .catch(console.error);
    }
    else {
        [
            "port",
            "production",
            "nbr_modulus_length",
            "hash_jwt_blacklist",
            "nbr_jwt_duration",
            "redis_connection"
        ].forEach(checkVariable);
        for (let i = 0; i < cpus().length; i++) {
            fork({ bddBuilded:"true" });
        }
    }
} else  {
    require("./main-worker.js");
}
