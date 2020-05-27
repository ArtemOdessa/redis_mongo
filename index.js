require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./services/cache");
require("./models/User");

const app = express();
app.use(bodyParser.json());

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

require("./routes/userRoutes")(app);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port`, process.env.PORT);
});
