const Rule = require('../model/Rule');
require('dotenv').config();

exports.addRule = async(req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Please provide the rule",
            });
        }
        const newRule = new Rule({
            content: content,
        });
        const savedRule = await newRule.save();
        return res.status(201).json({
            success: true,
            message: "Rule added successfully",
            rule: savedRule,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to add rule",
        });
    }
};
exports.editRule = async (req, res) => {
    try {
        const { ruleId, newContent } = req.body;
        if(!ruleId || !newContent) {
            return res.status(400).json({
                success: false,
                message: "Please provide ruleId and newContent for editing",
            });
        }
        const existingRule = await Rule.findById(ruleId);
        if(!existingRule) {
            return res.status(404).json({
                success: false,
                message: "Rule not found",
            });
        }
        existingRule.content = newContent;
        const updatedRule = await existingRule.save();
        return res.status(200).json({
            success: true,
            message: "Rule updated successfully",
            rule: updatedRule,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to edit rule",
        });
    }
};
