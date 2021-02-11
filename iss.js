const request = require("request");

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    // if non-200 status, server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // In the case we get a result we put that in to our callback as an
    // argument.
    callback(null, JSON.parse(body).ip);
  });
};

module.exports = { fetchMyIP };
