const express = require("express");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "qid",
    secret: "SJHWCuBgl5XJW5Yz}gRbWF2S?dK4PZqYU^+>e<?Y?Adf68?ldW",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 5000, // expiration in miliseconds
    },
  })
);

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// simulate user database
const users = [
  { id: 1, username: "curtis", password: "curtis" },
  { id: 2, username: "alex", password: "alex" },
];

app.get("/", (req, res) => {
  console.log(req.session);
  res.status(200).render("index");
});

app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.get("/login", (req, res) => {
  res.status(200).render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    req.session.userId = user.id;
    res.status(200).redirect("/dashboard");
  } else {
    res.status(401).redirect("/login");
  }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.status(200).render("dashboard");
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
