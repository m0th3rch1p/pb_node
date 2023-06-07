import * as dotenv from "dotenv";

import { RedisConfigOptions } from '@/types/redis.types';
import { MysqlConfig } from '@/types/mysqlConn.types';

// Enable .env reeading
dotenv.config();

export default {
    dev_domain: process.env.DEV_DOMAIN || "localhost",
    prod_domain: process.env.PROD_DOMAIN || "",
    // Server Configurations
    serverPort: parseInt(process.env.SERVER_PORT || "8080", 10),
    serverHost: process.env.SERVER_HOST || "localhost",

    // DB CONFIGURATIONS
    database: {
        primaryDb: process.env.PRIMARY_DB,
        secondaryDb: process.env.SECONDARY_DB,
        primaryDbType: process.env.PRIMARY_DB_CONN_TYPE || "connection",
        secondaryDbType: process.env.SECONDARY_DB_CONN_TYPE || "connection",
    
        dbDataSources: {
            mysql: {
                default: <MysqlConfig>{
                    host: process.env.MYSQL_HOST || "localhost",
                    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
                    user: process.env.MYSQL_USER || "root",
                    password: process.env.MYSQL_PASSWORD || "",
                    database: process.env.MYSQL_DATABASE || "test",
                    connectionType: process.env.PRIMARY_DB_CONN_TYPE || "connection"
                }
            },
            redis: {
                singleConnection: <RedisConfigOptions> {
                    host: process.env.REDIS_HOST || "localhost",
                    port: parseInt(process.env.REDIS_PORT || "6093"),
                    username: process.env.REDIS_USER || "root",
                    password: process.env.REDIS_PASSWORD || "",
                } 
            }
        },
    },
    session: {
        // Sessions Configuration
        sessionKey: process.env.SESSION_KEY || "secret-cat",
        sessionType: process.env.SESSION_TYPE || "database",
        sessionDB: process.env.SESSION_DB
    },
    // Payment Gateways Configurations
    paypal: {
        client_id: process.env.PAYPAL_CLIENT_ID || "",
        client_secret: process.env.PAYPAL_CLIENT_SECRET || ""
    },
    mpesa: {
        consumer_key: process.env.MPESA_CONSUMER_KEY || "",
        consumer_secret: process.env.MPESA_CONSUMER_SECRET || "",
        business_short_code: process.env.MPESA_BUSINESS_SHORT_CODE || "",
        pass_key: process.env.MPESA_PASS_KEY || ""
    }
};