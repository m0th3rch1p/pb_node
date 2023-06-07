import { TenantOrder } from "@/types/tenant.types";
import { UserOrder } from "@/types/user.types";
import { MpesaAccessToken, MpesaResponse } from "@/types/payment.types";
import { isUserOrder } from "@/guards/isUserOrder";

let consumer_key: string | null = null;
let consumer_secret: string | null = null;
let business_code: string | null = null;
let pass_key: string | null = null;

let baseUrl = "https://sandbox.safaricom.co.ke";
export const init_mpesa = (ck: string, cs: string, bc: string, pk: string) => {
    consumer_key = ck;
    consumer_secret = cs;
    business_code = bc;
    pass_key = pk;

    console.log("Mpesa Payment Gateway Initialized Successfully");
};

const generate_access_token = async () => {
    try {
        const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
        //@ts-expect-error
        const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        const mpesaAccessToken: MpesaAccessToken = await response.json();
        return mpesaAccessToken;
    } catch (error) {
        console.log("[mpesa.gateway][generate_access_token][error]: ", error);
        return null;
    }
};

export const stk_push = async (phone_number: string, order: UserOrder | TenantOrder) : Promise<MpesaResponse | null> => {
    try {
        if (!consumer_key || !consumer_secret || !business_code || !pass_key) {
            throw new Error("Mpesa Billing Gateway not initialized");
        }

        const date = new Date();
        const yr = date.getFullYear();
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDay() < 9 ? `0${date.getDay() + 1}` : date.getDay() + 1;
        const hrs = date.getHours() < 9 ? `0${date.getHours()}` : date.getHours();
        const mins = date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes();
        const secs = date.getSeconds() < 9 ? `0${date.getSeconds()}` : date.getSeconds();

        const timestamp = `${yr}${month}${day}${hrs}${mins}${secs}`;
        const password = Buffer.from(`${business_code}${pass_key}${timestamp}`).toString('base64');
        const CallBackURL = isUserOrder(order) ? `https://4221-102-140-229-5.ngrok-free.app/mg/usr/${order.ref}` : `https://4221-102-140-229-5.ngrok-free.app/mg/tnt/${order.ref}`

        //@ts-expect-error
        const response = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${generate_access_token()}`, 
            },
            body: JSON.stringify({
                "BusinessShortCode": business_code,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1, //order.amount,
                "PartyA": phone_number,
                "PartyB": business_code,
                "PhoneNumber": phone_number,
                "CallBackURL": CallBackURL,
                "AccountReference": "Binasta Limited",
                "TransactionDesc": `Payment for ${order.ref}` 
            })
        });
        
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};