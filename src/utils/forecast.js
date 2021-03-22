const request = require("request")
const dotenv = require("dotenv")
dotenv.config()
let forecast_api_key = process.env.WEATHERSTACK_API_KEY


function translate(text) {
  if (text === "Partly cloudy") return "Parçalı bulutlu"
  else if (text === "Overcast") return "Bulutlu"
  else if (text === "Sunny") return "Güneşli"
  else if (text === "Light snow") return "Hafif karlı"
  else if (text === "Light rain shower") return "Hafif yağmur"
  else if (text === "Light Rain Shower, Thunderstorm In Vicinity") return "Hafif yağmur sağanağı, çevresinde fırtına"
  else if (text === "Patchy rain possible") return "Parçalı yağmur ihtimali"
  else if (text === "Light Rain And Snow Shower")
    return "Hafif yağmur ve kar sağnağı"
  else if (text === "Mist") return "Sisli"
  else if (text === "Light Rain Shower") return "Hafif yağmurlu"
  else if (text === "Moderate or heavy rain with thunder") return "Gök gürültülü, orta veya şiddetli yağmurlu"
  else if (text === "Light Rain With Thunderstorm") return "Fırtınalı Hafif Yağmur"
  else {
    return text
  }
}

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key="+forecast_api_key+"&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Hava durumu servisine bağlanılamadı!", undefined)
    } else if (body.error) {
      callback("Konum bulunamadı, Farklı bir deneme yapın!", undefined)
    } else {
      const description = translate(body.current.weather_descriptions[0])
      callback(
        undefined,
        description +
          ". Anlık sıcaklık: " +
          body.current.temperature +
          " °C. Hissedilen sıcaklık: " +
          body.current.feelslike +
          " °C. Nem oranı: %" + body.current.humidity+"."
      )
    }
  })
}
module.exports = forecast
