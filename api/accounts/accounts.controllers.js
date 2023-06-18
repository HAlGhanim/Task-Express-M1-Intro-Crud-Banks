const Account = require("../../db/models/Account");

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().select("-createdAt -updatedAt");
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAccountByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { currency } = req.query; // Dinar to USD conversion: 1 KD = 3.25569 USD
    const foundAccount = await Account.findOne({ username: name });
    if (foundAccount) {
      if (currency?.toLowerCase() === "usd") {
        const dollars = foundAccount.funds * 3.25569;
        return res.status(200).json({
          foundAccount,
          conversion: dollars,
          message: `Conversion was made from ${foundAccount.funds} KWD to ${dollars} USD`,
        });
      }
      return res.status(200).json(foundAccount);
    } else {
      return res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      foundAccount.deleteOne();
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
    const foundAccount = await Account.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({
        msg: "Not found!",
      });
    }
    await foundAccount.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
