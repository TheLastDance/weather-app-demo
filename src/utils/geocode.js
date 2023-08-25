const request = require("request");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoidGhlbGFzdGRhbmNlIiwiYSI6ImNsa3B6c29neTE3ZjYzZmt5ZnNnYmk1dGsifQ.4B-QttW0QGRsIl4CeKfJpw&limit=1`
  // default arguments to avoid console errors when internet connection was lost.
  request({ url, json: true }, (error, { body: { features } = {} } = {}) => {
    if (error) {
      callback("Unable to connect with API", undefined);
    } else if (!features.length) {
      callback("Unable to find such location", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode;
