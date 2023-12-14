const Rule = require('../model/Rule');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
require('dotenv').config();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function main(query, flag) {
    const rules = await Rule.find();

    if (!flag) {
        let prompt = "Here are the rules:\n" +
        rules.map(rule => rule.content).join("\n") +
        "\n" +
        "Here is the query:\n" +
        query +
        "\n" +
        "Tell whether I should do this or not according to the rules given.";
        let messages = [{ content: prompt }];

        const result = await client.generateMessage({
            model: MODEL_NAME,
            prompt: { messages },
            temperature: 0
        });

        return result[0].candidates[0].content;
    } else {
        let total = query + " Generate an SQL Query for it.";
        let messages = [{ content: total }];

        const result = await client.generateMessage({
            model: MODEL_NAME,
            prompt: { messages },
            temperature: 0
        });

        return result[0].candidates[0].content;
    }
}

exports.generateQuery = async (req, res) => {
    try {
        const { userQuery } = req.body;
        if (!userQuery) {
            return res.status(400).json({
                success: false,
                message: "Please provide a user query",
            });
        }
        const generatedResponse = await main(userQuery, true);
        return res.status(200).json({
            success: true,
            message: "Query generated successfully",
            response: generatedResponse,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to generate query",
        });
    }
};

exports.generateDecision = async (req, res) => {
    try {
        const { userDecision } = req.body;
        if (!userDecision) {
            return res.status(400).json({
                success: false,
                message: "Please provide a user decision",
            });
        }
        const generatedDecision = await main(userDecision, false);
        return res.status(200).json({
            success: true,
            message: "Decision generated successfully",
            response: generatedDecision,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to generate decision",
        });
    }
};
