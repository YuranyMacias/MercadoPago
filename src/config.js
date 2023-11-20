import { config } from "dotenv";
config();

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;

// Server
export const PORT = process.env.PORT || 4000;
export const HOST = process.env.HOST;
