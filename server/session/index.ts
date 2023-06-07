import { connection as mysqlConn } from "@/database/mysql/mysql.database";
import { client as redisClient } from "@/database/redis/redis.database";

import { mysqlSessionInit } from "./mysql/mysql.session";
import { redisSessionInit } from "./redis/redis.session";
import config from "@/config";

export const session_init = () => {
    try {
        if (config.session.sessionType === "database") {
            switch (config.session.sessionDB) {
                case "mysql":
                    if (!mysqlConn) throw new Error("Mysql Connection has not yet been initialized");
                    return mysqlSessionInit(mysqlConn, config.database.dbDataSources.mysql.default, config.session.sessionKey);
                case "redis":
                    if (!redisClient) throw new Error("Redis Connection has not yet been initialized");
                    return redisSessionInit(redisClient);
                default:
                    throw new Error(`${config.session.sessionDB} is not yet supported`);
            }
        }
    } catch (error) {
        console.log("[session.index][init][error]: ", error);
        return null;
    }
};