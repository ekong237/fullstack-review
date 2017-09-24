const express = require('express');
let database = require('../database');
let bodyParser = require('body-parser');
let github = require('../helpers/github');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var userObj = req.body;
  console.log('1. post to repos >', req.body);
  github.getReposByUsername(userObj, res);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('reqbody>', req.body);

  database.find()
  .then((databaseResults)=>{
    res.send(databaseResults);
  })
  .catch((err)=>{
    return err;
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

