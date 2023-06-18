let accounts = require("../../accounts");
const Account = require("../../db/models/Account");

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().select("-createdAt -updatedAt");
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAccountByName = (req, res) => {
  const { name } = req.params;
  const { currency } = req.query; // Dinar to USD conversion: 1 KD = 3.25569 USD
  const findName = accounts.find((account) => account.username === name);
  if (findName) {
    if (currency?.toLowerCase() === "usd") {
      const dollars = findName.funds * 3.25569;
      return res.status(200).json({
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

exports.createAccount = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const deleteAccount = await Account.findOneAndDelete({ _id: accountId });
    if (deleteAccount) {
      accounts = accounts.filter((account) => account.id !== +accountId);
      console.log(accounts);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const findAccount = await Account.findByIdAndUpdate(accountId, req.body);
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
