import { fork, isMaster } from 'cluster';
import { cpus } from 'os';
import { build } from './build-bdd';

if (isMaster) {
    for (let i = 0; i < cpus().length; i++) {
        fork();
    }
    build()
        .catch(console.error);
} else  {
    require("./main-worker.js");
}