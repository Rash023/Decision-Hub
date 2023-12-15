const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
const ruleRoutes = require('./routes/rule')
const queryRoutes = require('./routes/query');

dotenv.config();
database.connect();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use("/api/v1/rule", ruleRoutes);
app.use("/api/v1/query", queryRoutes)

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});