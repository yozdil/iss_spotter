const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return null;
  }
  // success, print out the deets!

  for (const passTime of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);

    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);
  }
});
