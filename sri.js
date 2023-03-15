var express = require("express"),
  bodyParser = require("body-parser"),
  OAuth2Server = require("oauth2-server");
const model = require("./model"); // replace with your implementation of the model interface

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = new OAuth2Server({
  model, // See below for specification
  accessTokenLifetime: 0.1, // access token lifetime in seconds (default is 1 hour)
  allowBearerTokensInQueryString: true,
  grants: ["password", "refresh_token"],
  debug: true,
});
let port = 8080;

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.post("/get", (req, res) => {
  OAuth2Server.Request;
  app.oauth.token(
    new OAuth2Server.Request(req),
    new OAuth2Server.Response(res)
  ).then((data)=>res.send(data))
  .catch((data)=>res.send(data))
});


app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
