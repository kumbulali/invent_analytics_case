import app from "./app";
import config from "./config/config";
import dataSource from "./config/data-source";
import logging from "./middleware/logging";

const NAMESPACE = "Server";

dataSource
  .initialize()
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((error) => console.log(error));

app.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
