const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const location = {
    latitude: JSON.parse(body).latitude,
    longitude: JSON.parse(body).longitude,
  };

  const url = `http://api.open-notify.org/iss-pass.json?lat=${location.latitude}&lon=${location.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
