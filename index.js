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
  // console.log('the _id in paras is : ', _id);
  // variables prepare
  let description, duration, date;
  // search the user in the users array
  let user = users.find(user => user._id === parseInt(_id));
  // console.log('the user in users array is : ', user);
  if (!user) {
    // response err
    res.json({ error: 'username not found' });
    // console.log('the username is of the _id you input is not found');
    return;
  } else { 
    user.exercises = user.exercises || [];
    // check description
    if (!req.body.description) {
      // response err
      res.json({ error: 'description not found' });
      // console.log('the description you input is not found');
      return;
    } else {
      description = req.body.description;
      // console.log('the description you input is : ', description);
    }
    // check duration
    if (!req.body.duration) {
      // response err
      res.json({ error: 'duration not found' });
      // console.log('the duration you input is not found');
      return;
    } else {
      // check if the duration is a number
      if (isNaN(req.body.duration)) {
        // response err
        res.json({ error: 'duration is not a number' });
        // console.log('the duration you input is not a number');
        return;
      }
      duration = req.body.duration;
      duration = parseInt(duration);
      // console.log('the duration you input is : ', duration);
    }
    // check date
    if (!req.body.date) {
      // use today's date
      date = new Date();//.toDateString();
      // format it '2025-04-30'
      date = date.toISOString().split('T')[0];
      // console.log('the date you input is not found, so use today\'s date', date);
      // return;
    } else {
      date = req.body.date;
      // console.log('the date you input is : ', date);
      // return;
    }
    // console.log('the exercise obj is : ', duration, description, date );
    // res.json({ duration, description, date });
    // return;
    // add exercise to the user
    user.exercises.push({ description, duration, date });
    // return a user object added exercise property.
    res.json(user);
    // console.log('the user list is : ', users);
  }

})


// 1-5    
 TODO: how to delete all row including 'console.log'?



// ===========================My codes==================================================




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
