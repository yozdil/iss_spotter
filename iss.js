/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

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

const fetchISSFlyOverTimes = (obj, callback) => {
  // use request to ISS flyover
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${obj.latitude}&lon=${obj.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
      }
      // if non-200 status, server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS flyover for the given coordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      // If we do get a result pass it into the callback as an argument.
      callback(null, JSON.parse(body).response);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIp(ip, (err, location) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(location, (err, passTimes) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, passTimes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
};
