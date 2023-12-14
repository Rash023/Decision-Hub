const express = require("express");
const { addRule, editRule } = require("../controller/Rule");
const router = express.Router()
router.post('/addRule',addRule);
router.post('/editRule',editRule)
module.exports = router;