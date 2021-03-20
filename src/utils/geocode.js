const request = require('request')

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      address +
      ".json?access_token=pk.eyJ1IjoieWFzaW5hdGlsa2FuNjAiLCJhIjoiY2tsaWM5eTNyMXh6ZjJzbWdtNDRqNWl5aSJ9.KfB6TzL9vPfXjo0Jdtakaw";
    request({ url, json: true }, (error, {body}={}) => {
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
              location: body.features[0].place_name
          })
      }
    });
  };

  module.exports = geocode