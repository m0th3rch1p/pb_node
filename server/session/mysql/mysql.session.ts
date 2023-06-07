import { MysqlConfig } from '@/types/mysqlConn.types';
import { Connection, Pool } from "mysql2/promise";
import session, { SessionOptions } from "express-session";
import MySQLStore from "express-mysql-session";

let sessionStore: MySQLStore.MySQLStore;

export const mysqlSessionInit = (conn: Connection | Pool, dbConfig: MysqlConfig, secret: string) => {
    try {
        sessionStore = new (MySQLStore(<any>session))(dbConfig, conn);
        const sessionOptions: SessionOptions = {
            secret: secret,
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        };
        return session(sessionOptions);
    } catch (error) {
        console.log("[session.mysql.session][error]: ", error);
        return null;
    }
};

export const mysqlDestroySession = () => {
    sessionStore.close();
};
