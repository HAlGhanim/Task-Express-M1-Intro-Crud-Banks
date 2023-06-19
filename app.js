const express = require("express");
const accountRoutes = require("./api/accounts/accounts.routes");
const database = require("./database");
const dotEnv = require("dotenv");
const app = express();

dotEnv.config();
database();

app.use(express.json());
app.use("/accounts", accountRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost: ${process.env.PORT}`);
});
