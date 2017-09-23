const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// var db = mongoose.connect('mongodb://localhost:1128');

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  html_url: String,
  private: Boolean
});

// owner: {
//     login: String, 
//     id: Number
//   }

  // description: String,
  // fork: Boolean,
  // branches_url: String,
  // subscribers_url: String, 
  // subscription_url: String,
  // git_url: String, 
  // clone_url: String,
  // updated_at: Date

let Repo = mongoose.model('Repo', repoSchema);
//repoObj is an array

let save = (arrOfRepoObjects) => {
  let userPromises = arrOfRepoObjects.map(eachRepo => {
    return createRepo(eachRepo).save();
  });
  
  return Promise.all(userPromises);
  // if we return promise.all, whatever function called save can call .then on it
};

let find = () => {
  return Repo.find().limit(25).sort('id');
};

let createRepo = function(oneRepoObj){
  var insertRepoObj = {
    id: oneRepoObj.id,
    name: oneRepoObj.name,
    username: oneRepoObj.owner.login,
    html_url: oneRepoObj.html_url,
    private: oneRepoObj.private
  };
  var newRepo = new Repo(insertRepoObj);
  return newRepo;
};



module.exports.save = save;
module.exports.find = find;

// doSomething().then(function(result) {
//   return doSomethingElse(result);
// })
// .then(function(newResult) {
//   return doThirdThing(newResult);
// })
// .then(function(finalResult) {
//   console.log('Got the final result: ' + finalResult);
// })
// .catch(failureCallback);
