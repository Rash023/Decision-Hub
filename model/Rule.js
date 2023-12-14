const mongoose = require("mongoose");
const ruleSchema = new mongoose.Schema({
	content: {
        type: String
    }
});
module.exports = mongoose.model("Rule",ruleSchema);