const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
let mapbox_api_key = process.env.MAPBOX_API_KEY

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token="+mapbox_api_key
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Lokasyon servisine bağlanılamadı!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Lokasyon bilgisine ulaşılamıyor. Farklı bir arama yapın!",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
