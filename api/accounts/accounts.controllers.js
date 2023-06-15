let accounts = require("../../accounts");

const getAllAccounts = (req, res) => {
  console.log(accounts);
  return res.status(200).json(accounts);
};

const getAccountByName = (req, res) => {
  const { name } = req.params;
  if (accounts.find((account) => account.username === name)) {
    return res
      .status(200)
      .json(accounts.find((account) => account.username === name));
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
};

const createAccount = (req, res) => {
  const newId = accounts[accounts.length - 1].id + 1;
  const newAccount = { id: newId, ...req.body, funds: 0 };
  accounts.push(newAccount);
  console.log(accounts[accounts.length - 1]);
  return res.status(201).json(accounts);
};

const deleteAccount = (req, res) => {
  const { accountId } = req.params;
  console.log(accounts);
  if (accounts.find((account) => account.id === +accountId)) {
    accounts = accounts.filter((account) => account.id !== +accountId);
    console.log(accounts);
    return res.status(204).end();
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
};

const updateAccount = (req, res) => {
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
  return res.status(201).json(findId);
};

module.exports = {
  getAllAccounts,
  getAccountByName,
  createAccount,
  deleteAccount,
  updateAccount,
};