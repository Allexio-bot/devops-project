import { Logger} from "@nestjs/common";
import { connect } from 'mongoose';
import * as redis from "redis";

const logger = new Logger("DatabaseProviders");

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof import('mongoose')> => {
      try {
        const options = {
          useFindAndModify:false,
          useUnifiedTopology: true, 
          useNewUrlParser: true, 
          useCreateIndex: true 
        };
        const { mongo_connection } = process.env;
        let connection = await connect(mongo_connection, options);
        logger.log("Mongodb connection done");
        return connection; 
      } catch(e) {
        logger.error(JSON.stringify(e));
        process.exit(1);
      }
    }
  },
  {
    provide: 'REDIS_CONNECTION',
    useFactory: async ():Promise<redis.RedisClient> => {
      try {
        const { redis_connection } = process.env;
        logger.log("Create redis connection");
        const redisClient = redis.createClient(redis_connection);
        logger.log("Redis connection done");
        return redisClient;
      } catch(e) {
        logger.error(JSON.stringify(e));
        process.exit(1);
      }
    }
  }
];