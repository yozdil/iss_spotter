const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIp("142.113.88.222", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned location:", data);
});

fetchISSFlyOverTimes(
  { latitude: "46.0711", longitude: "-73.891" },
  (error, passTimes) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned flyover times:", passTimes);
  }
);
