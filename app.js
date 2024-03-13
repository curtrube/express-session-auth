const express = require("express");
const cookieParser = require('cookie-parser')

const app = express();

app.set('view engine', 'ejs')

app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// simulate user database

const USERS = new Map()

USERS.set('curtis', { id: 1, username: 'curtis', password: 'supersecret' })
USERS.set('alex', { id: 2, username: 'alex', password: 'abc123' })

const SESSIONS = new Map()

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.get('/login', (req, res) => {
  res.render('login', { error: null })
})

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.get(username)
  if (!user) {
    res.status(401).json({ message: `no user found matching ${username}` })
    return;
  } else {
    console.log(`found user ${username}`)
  }

  // create unique session id
  const sessionId = crypto.randomUUID();
  SESSIONS.set(sessionId, username)

  res.cookie('sessionId', sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    // maxAge: 30000
  }).send(`Authenticated as ${username}`)
});

app.get('/private', (req, res) => {
  console.log(req.cookies)
  const user = SESSIONS.get(req.cookies.sessionId)
  console.log(user)
  if (user == null) {
    res.sendStatus(401)
    return;
  }
  res.status(200).json({ message: 'super secret data only authenticatd users can view' })
  // res.status(200).send('sensative data')
})

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
