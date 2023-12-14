const express = require("express");
const { generateQuery, generateDecision } = require("../controller/Query");
const router = express.Router()
router.post('/generateQuery',generateQuery);
router.post('/generateDecision',generateDecision)
module.exports = router;