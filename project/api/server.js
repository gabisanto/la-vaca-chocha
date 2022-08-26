const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const models = require("./models");
const db = require("./config/db");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));

const routes = require("./routes");
const envs = require("./config/envs");

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(envs.PORT, () =>
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
  );
});
