import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;

const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

const DATABASE = {
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  name: "postgres",
};

const config = {
  server: SERVER,
  database: DATABASE,
};

export default config;
