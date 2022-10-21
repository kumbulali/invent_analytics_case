import { DataSource } from "typeorm";
import config from "./config";

const dataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + "/../**/*.entity.js"],
  synchronize: true,
});

export default dataSource;
