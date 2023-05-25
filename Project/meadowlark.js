const express = require("express");
const exphbs = require("express-handlebars");
var hbs = exphbs.create({ defaultLayout: "main" });

const app = express();

app.use(express.static(__dirname + "/public"));

//configure Handlebars view engine

// Configure Handlebars view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ];

  let message = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { message });
});

//custom 404 page

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//custom 500 page

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  );
});
