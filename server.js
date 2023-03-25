const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Port set up using the express app
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// TO INFORM THE SERVER IS READY AND WHICH PORT BEING USED
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App running via: http://localhost:${PORT}!`);
  });
});