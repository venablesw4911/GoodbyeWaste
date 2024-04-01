import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ?? 3030;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

export { port, dbUsername, dbPassword };