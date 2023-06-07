import { createClient, RedisClientType } from "redis";
import { RedisConfigOptions } from "@/types/redis.types";

export let client: RedisClientType | null = null; 

export const redis_init = (dbConfig: RedisConfigOptions) : void => {
    try {
        db_connect(dbConfig);
        console.log("Redis DB Initialized successfully");
    } catch (error) {
        console.log("Error initializing redis databasae");
        console.log("[database.redis.index][init][error]: ", error);
    }

};

export const get = async (key: any) => {
    try {
        if (client === null) throw new Error("Redis has not yet been initialized");
        return await client.get(key);
    } catch (error) {
        console.log("[database.redis.index][init][get]: ", error);
    }
}

export const set = (key: any, val: any) : boolean => {
    try {
        if (client === null) throw new Error("Redis has not yet been initialized");
        client.set(key, val);

        return true;
    } catch (error) {
        console.log("[database.redis.index][init][set]: ", error);
        return false;
    }
}

const db_connect = async (dbConfig: RedisConfigOptions): Promise<void> => {
    try {
        const url = `redis://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}`;
        client = createClient({ url });    

        client.on("error", (err) => { throw new Error(err) });

        await client.connect();
    } catch (error) {
        console.log("[database.redis.index][db_connect][error]: ", error);
    }
};

const db_disconnect = async (): Promise<void> => {
    try {
        if (client == null) throw new Error("Redis client has not been initialized. Please initialize the db first before trying to destroy it");
        await client.disconnect();
        console.log("[+] redis client disconnected successfully");
    } catch (error ){
        console.log("[dabtase.redis.index][db_disconnect][error]: ", error);
    }
}