const request = require("request");

const fetchMyIP = (callback) => {
  // use request to fetch IP address
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

const fetchCoordsByIp = (ip, callback) => {
  // use request to fetch lat & long
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    // if non-200 status, server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // In the case we get a result we put that in to our callback as an
    // argument. As we need this argument to be an object we go ahead and create it.
    let location = {
      latitude: JSON.parse(body).latitude.toString(),
      longitude: JSON.parse(body).longitude.toString(),
    };
    // Shorthand version: const { latitude, longitude } = JSON.parse(body);
    // callback(null, { latitude, longitude });
    callback(null, location);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };
