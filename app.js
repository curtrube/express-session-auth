const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "SJHWCuBgl5XJW5Yz}gRbWF2S?dK4PZqYU^+>e<?Y?Adf68?ldW",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.post("/login", (req, res) => {
  console.log(req.sessionID);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "you must login" });
  }
  res.status(200).json({ message: "hello login route" });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
