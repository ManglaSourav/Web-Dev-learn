require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const handler = require("./handlers");
const db = require("./models");
const routes = require("./routes");

const app = express();

app.use(cors());
/**
 * To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
The middleware was a part of Express.js earlier but now you have to install it separatel3y.
This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. 
 */
app.use(bodyParser.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("hello world"));
app.use("/api/auth", routes.auth);
app.use("/api/polls", routes.poll);
app.use(handler.notFound);
app.use(handler.errors);
app.listen(port, console.log(`server started on port ${port}`));
