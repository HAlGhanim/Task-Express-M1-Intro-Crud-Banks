const express = require("express");
const accountRoutes = require("./api/accounts/accounts.routes");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/accounts", accountRoutes);

app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
