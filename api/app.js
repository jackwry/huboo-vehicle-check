const axios = require("axios");
var express = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT;
if (!port) throw "Env var not set: PORT";

var app = express();

app.get("/vehicle-check", async function (req, res) {
  console.log("GET:vehicle-check");

  if (!req.query.registration) {
    res.status(400).send({ error: "registration query param is required" });
    return;
  }

  try {
    const response = await axios.get(
      `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${req.query.registration}`,
      {
        headers: {
          Accept: "application/json+v6",
          "x-api-key": "HybH0yr4Hj3eEgybT9pkn6B7PA769YDa8kt4wKdp",
        },
      }
    );

    res.send(response.data);
  } catch ({ response }) {
    res.status(response.status).send({ error: response.statusText });
    return;
  }
});

console.log("Starting HTTP server...");
const server = app.listen(port);

const onTerminate = () => {
  console.log("Termination signal received... stopping web server.");
  server.close();
};

process.on("SIGINT", onTerminate);
process.on("SIGTERM", onTerminate);
