const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const rootPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// const helpPath = path.join(__dirname, "../public/help.html");
// const aboutPath = path.join(__dirname, "../public/about.html");

// app.get("", (req, res) => {
//   res.send("<h1 style='color:blue'>Hello Express!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send("Help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h2>About</h2>");
// });

app.use(express.static(publicDirectoryPath));
//app.use("/about", express.static(aboutPath));
//app.use("/help", express.static(helpPath)); // not necessary if we want to use direct file in the path (localhost:3000/help.html)

app.set("views", rootPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "David"
  });
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "David"
  });
})

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "If you need help contact us +99574563124",
    title: "Help",
    name: "David TheLastDance"
  });
})

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "Error occured. Provide a location."
    })
  }

  geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, data) => {
      if (error) return res.send({ error });

      res.send({
        forecast: data,
        adress: req.query.adress,
        location
      });
    })
  })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    msg: "Help article not found.",
    name: "David"
  })
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: 404,
    msg: "Page not found",
    name: "David"
  })
});

app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
