const express = require("express");
const exphbs = require("express-handlebars");
var hbs = exphbs.create({ defaultLayout: "main" });

const app = express();

app.use(express.static(__dirname + '/public'))

//configure Handlebars view engine

// Configure Handlebars view engine
app.engine("handlebars",  hbs.engine);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
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
