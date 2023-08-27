const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b45fda5708eeda662ad8c4c5472894db&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect with API", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        msg: `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} temperature.`,
        png: body.current.weather_icons[0],
      })
    }
  })
}

//console.log(`It is currently ${res.temperature} degrees out. It feels like ${res.feelslike} temperature.`);

module.exports = forecast;