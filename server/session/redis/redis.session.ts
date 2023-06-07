import { RedisClientType } from 'redis';
import RedisStore from "connect-redis";
import session from "express-session";

let redisStore: RedisStore | null;
export const redisSessionInit = (client: RedisClientType) => {
    try {
        console.log(`[session.mysql.session][redisSessionInit][DEBUG]: secret: ${process.env.SESSION_SECRET}`);
        redisStore = new RedisStore({
            client,
            prefix: "mlmapp:"
        });
        if (!redisStore) throw new Error("Error initializing redis store");

        return session({
            store: redisStore,
            resave: false,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET || "secret",
        });
    } catch (error) {
        console.log("[database.session.redis][redisSessionInit][error]: ", error);
        return null;
    }
};