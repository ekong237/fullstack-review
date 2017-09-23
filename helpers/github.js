const request = require('request');
const config = require('../config.js');
let express = require('express');
let database = require('../database');

let getReposByUsername = (userObj, res) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // var userObj = req.body;
  console.log('2. getReposByUsername >', userObj);

  let options = {
    url: `https://api.github.com/users/${userObj.username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  request.get(options, function(err, response, body){
    if (err) { console.log('ERROR:', err); }
    var githubUserRepo = JSON.parse(response.body);

    database.save(githubUserRepo)
      .then( (arrOfEntries) => {
        console.log('3. arrOfEntries>', arrOfEntries);
        return database.find()
      })
      .then ((databasePullResults) => {
        console.log('25:', databasePullResults);
        res.send(databasePullResults);
      }); 
  });

}

module.exports.getReposByUsername = getReposByUsername;