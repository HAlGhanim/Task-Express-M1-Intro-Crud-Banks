const express = require("express");
let accounts = require("./accounts");
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/accounts", (req, res) => {
  console.log(accounts);
  return res.status(200).json(accounts);
});

app.get("/accounts/:name", (req, res) => {
  const { name } = req.params;
  if (accounts.find((account) => account.username === name)) {
    return res
      .status(200)
      .json(accounts.find((account) => account.username === name));
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
});

app.post("/accounts", (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  const newAccount = { id, ...req.body, funds: 0 };
  accounts.push(newAccount);
  console.log(accounts[accounts.length - 1]);
  return res.status(201).json(accounts);
});

app.delete("/accounts/:accountId", (req, res) => {
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

app.put("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const findId = accounts.find((account) => account.id === +accountId);
  if (!findId) {
    return res.status(404).json({
      msg: "Not found!",
    });
  }
  for (const key in findId) {
    if (key !== "id") findId[key] = req.body[key] ? req.body[key] : findId[key];
  }
  return res.status(200).json(findId);
});

app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
