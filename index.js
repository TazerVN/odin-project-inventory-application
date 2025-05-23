const express = require("express");
const path = require("node:path");
const app = express();

const indexRouter = require("./routes/indexRouter");
const typeRouter = require("./routes/typeRouter")
const trainerRouter = require("./routes/trainerRouter")
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.use("/type", typeRouter)
app.use("/trainer", trainerRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
