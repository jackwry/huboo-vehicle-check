const axios = require("axios");
var express = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/vehicle-check", async function (req, res) {
  if (!req.query.registration) {
    res.status(400).send({ error: "registration query param is required" });
    return;
  }

  const response = await axios.get(
    `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${req.query.registration}`,
    {
      headers: {
        Accept: "application/json+v6",
        "x-api-key": "HybH0yr4Hj3eEgybT9pkn6B7PA769YDa8kt4wKdp",
      },
    }
  );

  res.status(response.status).send(response.data);
});

const server = app.listen(process.env.PORT);

const onTerminate = () => {
  server.close();
};

process.on("SIGINT", onTerminate);
process.on("SIGTERM", onTerminate);
