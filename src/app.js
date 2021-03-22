const path = require("path") // node core module
const express = require("express") // npm module
const hbs = require("hbs") // npm module
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public") // path manipulation
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Hava Durumu",
    name: "Yasin Atılkan",
  }) // views/index.hbs
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Uygulama Hakkında",
    name: "Yasin Atılkan",
  })
})


app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Bir arama ifadesi girmelisiniz.",
    })
  }
  res.send({
    products: [],
  })
})

// endpoint
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Bir adres ifadesi giriniz.",
    })
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        })
        console.log(location)
        console.log(forecastData)
      })
    }
  )
})

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Uygulama bilgi sayfası bulunamadı.",
    name: "Yasin Atılkan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Sayfa bulunamadı.",
    name: "Yasin Atılkan",
  })
})

app.listen(port, () => {
  console.log("Server is up on port "+port)
})
