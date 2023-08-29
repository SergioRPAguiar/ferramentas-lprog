require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const http = require("http");
const app = express();

const port = 3000;

const bodyParser = require("body-parser");
const { resolveSoa } = require("dns");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Express is running..." });
});

app.get("/users", verifyJWT, (req, res, next) => {
    console.log('show users');
    res.json([{id: 1, nome: "Sergio"}])
})

app.post("/login", (req, res, next) => {
  if (req.body.user === "sergio" && req.body.pwd === "sergio123") {
    const id = 1; //
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 600, // 10min
    });
    return res.json({ auth: true, token: token });
  }
  return res.json({ auth: false, msg: "Login Inválido" });
});

app.post("/logout", (req, res) => {
  res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  const token = req.headers["x-acess-token"];

  if (!token) res.status(401).json({ auth: false, msg: "No token provided" });
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      res
        .status(500)
        .json({ auth: false, msg: "Failed to authenticate token" });
        req.userId = decoded.id;
        next()
  });
}

const server = http.createServer(app);
server.listen(port);
console.log("Express is running...");
