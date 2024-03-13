const express = require('express')
const session = require('express-session')

const app = express();

app.use(session({
    secret: 'SJHWCuBgl5XJW5Yz}gRbWF2S?dK4PZqYU^+>e<?Y?Adf68?ldW',
    cookie: { maxAge: 30000 },
    saveUninitialized: false
}))

app.post('/login', (req, res) => {
    res.send(200)
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
})