const express = require("express");
let accounts = require("./accounts");
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/api/accounts", (req, res) => {
  console.log(accounts);
  return res.status(200).json(accounts);
});

app.get("/api/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  if (!accounts.find((account) => account.id === +accountId)) {
    return res.status(404).json({ message: "Account not found" });
  } else {
    return res
      .status(200)
      .json(accounts.find((account) => account.id === +accountId));
  }
});

app.post("/api/accounts", (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  console.log(req.body);
  const newAccount = { id, ...req.body, funds: 0 };
  accounts.push(newAccount);
  return res.status(201).json(accounts);
});

app.delete("/api/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  console.log(accounts);
  if (accounts.find((account) => account.id === +accountId)) {
    accounts = accounts.filter((account) => account.id !== +accountId);
    console.log(accounts);
    return res.status(204).json(accounts);
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
});

app.put("/api/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const findId = accounts.find((account) => account.id === +accountId);
  if (findId) {
    for (const key in req.body) {
      findId[key] = req.body[key];
    }
    console.log(accounts);
    return res.status(201).json(accounts);
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
});

app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
