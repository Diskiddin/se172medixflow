import * as bodyParser from "body-parser";
import * as cors from "cors"; // enables cross origin requests from client by setting Access-Control-Allow-Origin header
import * as express from "express";
import * as restify from "express-restify-mongoose";
import * as mongoose from "mongoose";

const https = require("https");

const config = require("./config");
const Request = require("./models/request");
const Pain = require("./models/pain");
const Patient = require("./models/patient");
const app = express();
const router = express.Router();
const fs = require("fs");

const options = {
  key:  fs.readFileSync(config.https.pathToKeyFile),
  cert:  fs.readFileSync(config.https.pathToCertFile)
};

console.log("Key: " + options.key);
console.log("Cert: " + options.cert);

app.use(bodyParser.json());
app.use(cors());
app.use(router);

mongoose.connect(config.db.uri, { useNewUrlParser: true }, function(err, db) {
  if (err) {
      console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
      console.log('Connected to Server successfully!');
  }
});

restify.serve(router, Request);
restify.serve(router, Patient);
restify.serve(router, Pain);

app.get('/', (err, res) => {
	res.status(200);
	res.json({ working: true });
	res.end();
});

app.listen(config.port, () => {
  // @ts-ignore
  console.log(`Express server listening on port ${config.port}`);
});

https.createServer(options, app).listen(8443);

module.exports = app;
