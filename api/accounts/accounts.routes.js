const express = require("express");
const router = express.Router();
const {
  getAllAccounts,
  getAccountByName,
  createAccount,
  deleteAccount,
  updateAccount,
} = require("../accounts/accounts.controllers");

router.get("/", getAllAccounts);

router.get("/:name", getAccountByName);

router.post("/", createAccount);

router.delete("/:accountId", deleteAccount);

router.put("/:accountId", updateAccount);

module.exports = router;
