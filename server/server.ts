import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';
import helmet from 'helmet'

import config from "@/config";
import { db_init } from "@/database";
import { session_init } from "@/session";

import { init_pp } from "@/services/paymentGateways/paypal.gateway";
import { init_mpesa } from "@/services/paymentGateways/mpesa.gateway";

declare module "express-session" {
    interface SessionData {
        user_id: number,
        role: 'waiter' | 'chef' | 'manager' | 'customer'
    }
};

const mainApp: Application = express();

// 3rd Party Middlewares
mainApp.use(helmet());
mainApp.use(cors());
mainApp.use(morgan("combined"));

// Initialize DB
db_init();

// Intialize Payment Processors
init_pp(config.paypal.client_id, config.paypal.client_secret);

init_mpesa(config.mpesa.consumer_key, config.mpesa.consumer_secret, config.mpesa.business_short_code, config.mpesa.pass_key);

// Initialize Session
const session = session_init();
if (!session) process.exit();
mainApp.use(session);

// Server Spin Up
mainApp.listen(config.serverPort, config.serverHost, () => {
    console.log("[+] Server configured & started successfully...");
});