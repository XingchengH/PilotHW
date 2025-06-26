const express = require("express");

const app = express();
const PORT = 3000;

// Using view engine
app.set("view engine", "ejs");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // allow parse json from body

app.get("/", (req, res) => {
  console.log("Here");
  // res.send('Hi') // passing to user
  // res.status(200).json({message: "Success"})
  res.render("index", { text: "world" });
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

// middleware
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(PORT, () => {
  console.log(`Server is listening to PORT: ${PORT}`);
});
