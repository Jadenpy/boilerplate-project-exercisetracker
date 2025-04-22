const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
bodyParse = require('body-parser')    // require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(bodyParse.urlencoded({ extended: false }));   // use body-parser   

// ===========================My codes==================================================

// section 1 : the requirements of the proj.

// 1-1 :  your own proj.
// 1-2 :  method: POST --> /api/users to create a new user.                                               // USER
//        1-2-1 : check if the username is taken.
//        1-2-2 : return a object {username: _id: }.
// 1-3 :  method: GET  /api/users <-- all users in a list.
// 1-4 :  method: POST --> /api/users/:_id/exercises to add an exercise.                                  // EXERCISE
//        form items: description, duration, date(if empty, use today's date).
//        return a user object added exercise property.
// 1-5 :  method: GET  /api/users/:_id/logs to get a user's exercise log.                                 // USER EXERCISE LOG
//        return a user {} with added count(number),logs(list) property.
//        each log {} should have description(string), duration(number), and date(string) properties.
//        can add from and to query parameters to filter the logs by date.
//        can add limit query parameter to limit the number of logs returned.




// section 2 : the codes of the proj.

// 2-1 :  declare the variables and the functions.
// 2-2 :  the logic of the proj.

let users = [];

// 1-2  
app.post("/api/users", (req, res) => {
  let username = req.body.username;
  // console.log('the username you submit is : ', username);
  // check if the username is taken.
  let isTaken = users.some(user => user.username === username);
  if (isTaken) {
    res.json({ error: 'username already taken' });
    console.log('username already taken');
  } else {
    // _id prepare
    let _id = users.length + 1;
    // new user prepare
    let user = { username, _id};
    // add new user to the users array
    users.push(user);
    // return a object {username: _id: }
    res.json(user);
    console.log('the user list is : ', users);
  }
})

// 1-3
app.get("/api/users", (req, res) => {
  // return a list of all users.
  res.json(users);
  console.log('the user list is : ', users);
})

// 1-4     TODO
app.post("/api/users/:_id/exercises", (req, res) => {
  // get the _id from the url
  let _id = req.params._id;
  console.log('the _id in paras is : ', _id);
  // get the username from the users array
  let username = users.find(user => user._id === parseInt(_id)).username;
  console.log('the username in users array is : ', username);
  return;
  // check if the username is valid
  if (!username) {
    // response err
    res.json({ error: 'username not found' });
    console.log('the username is of the _id you input is not found');
  } else {
    // 1
    console.log('the post params is : ', req.params);
  }

  // get the description from the request body
  
})



// ===========================My codes==================================================




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
