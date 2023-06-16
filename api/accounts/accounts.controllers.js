let accounts = require("../../accounts");

const getAllAccounts = (req, res) => {
  console.log(accounts);
  return res.status(200).json(accounts);
};

const getAccountByName = (req, res) => {
  const { name } = req.params;
  const { currency } = req.query; // Dinar to USD conversion: 1 KD = 3.25569 USD
  const findName = accounts.find((account) => account.username === name);
  if (findName) {
    if (currency?.toLowerCase() === "usd") {
      const dollars = findName.funds * 3.25569;
      return res
        .status(200)
        .json({
          ...findName,
          funds: dollars,
          message: `Conversion was made from ${findName.funds} KWD to ${dollars} USD`,
        });
    }
    return res.status(200).json(findName);
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
  const findAccount = accounts.find((account) => account.id === +accountId);
  if (!findAccount) {
    return res.status(404).json({
      msg: "Not found!",
    });
  }
  for (const key in findAccount) {
    if (key !== "id")
      findAccount[key] = req.body[key] ? req.body[key] : findAccount[key];
  }
  return res.status(201).json(findAccount);
};

module.exports = {
  getAllAccounts,
  getAccountByName,
  createAccount,
  deleteAccount,
  updateAccount,
};
