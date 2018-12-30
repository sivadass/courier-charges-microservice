var path = require("path");
var express = require("express");
var regionData = require("./utils");

var port = process.env.BACKEND_PORT || 3002;

var app = express();

app.get("/", (req, res) =>
  res.json("Courier Charges Micro-service is live now!!")
);

app.get("/check-pincode/:pincode", (req, res) => {
  // get the pincode from request params
  const pincode = req.params.pincode;

  // convert pinocde to a string, then extract the first digit
  const firstDigit = String(pincode).charAt(0);

  // convert the first digit back to an integer
  const zone = Number(firstDigit);

  const setPricing = zone => {
    let result = null;
    switch (zone) {
      case 1:
        result = regionData[0];
        break;
      case 2:
        result = regionData[1];
        break;
      case 3:
        result = regionData[2];
        break;
      case 4:
        result = regionData[3];
        break;
      case 5:
        result = regionData[4];
        break;
      case 6:
        result = regionData[5];
        break;
      case 7:
        result = regionData[6];
        break;
      case 8:
        result = regionData[7];
        break;
    }
    return result;
  };

  if (pincode.length === 6 && zone !== 0 && zone !== 9) {
    res.json({
      pincode: pincode,
      price: setPricing(zone)
    });
  } else {
    res.status(500).send({ error: "PINCODE is not valid!" });
  }
});

app.listen(port, () =>
  console.log(`Courier Charges Micro service listening on port ${port}!`)
);
