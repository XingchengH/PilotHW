const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.query.name; // to access query parames
  res.send("User List");
});

router.get("/new", (req, res) => {
  res.render("users/new", { firstname: "Test" });
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstname: req.body.firstname });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstname: req.body.firstname });
  }
  //   req.body.firstname;
  //   res.send("Create User");
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`User Get: ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`User Get: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`User Get: ${req.params.id}`);
  });

// whenever encounter a route with a param id, run below
const users = [{ name: "Kyle" }, { name: "Vincent" }];
router.param("id", (req, res, next, id) => {
  //   console.log(id);
  req.user = users[id];
  next();
});

module.exports = router;
