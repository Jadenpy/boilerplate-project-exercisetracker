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
//        {
//          username: "fcc_test",
//          _id: "5fb5853f734231456ccb3b05"
//        }
// 1-3 :  method: GET  /api/users <-- all users in a list.
// 1-4 :  method: POST --> /api/users/:_id/exercises to add an exercise.                                  // EXERCISE
//        form items: description, duration, date(if empty, use today's date).
//        return a user object added exercise property.
//        {
//          username: "fcc_test",
//          description: "test",
//          duration: 60,
//          date: "Mon Jan 01 1990",
//           _id: "5fb5853f734231456ccb3b05"
//        }
// 1-5 :  method: GET  /api/users/:_id/logs to get a user's exercise log.                                 // USER EXERCISE LOG
//        return a user {} with added count(number),logs(list) property.
//        each log {} should have description(string), duration(number), and date(string) properties.
//        can add from and to query parameters to filter the logs by date.
//        can add limit query parameter to limit the number of logs returned.
//        {
//          username: "fcc_test",
//          count: 1,
//          _id: "5fb5853f734231456ccb3b05",
//          log: [{
//           description: "test",
//           duration: 60,
//           date: "Mon Jan 01 1990",
//          }]
//        }



// section 2 : the codes of the proj.

// 2-1 :  declare the variables and the functions.

let users = [];

let exerLogs = [];

// 2-2 :  the logic of the proj.



// 1-2  
app.post("/api/users", (req, res) => {
  let user = {}
  user.username = req.body.username;
  user._id = users.length + 1;
  user._id = user._id.toString();
  users.push(user);
  // console.log(user,users);
  
  res.json(user);
})

// 1-3
app.get("/api/users", (req, res) => {
  res.json(users);
})

// 1-4     TODO
app.post("/api/users/:_id/exercises", (req, res) => {
  let exer = {};
  let _id, description, duration, date, username;
  _id = req.params._id;
  // get username from users by _id
  users.forEach((item) => {
    if (item._id === _id) {
      username = item.username;    
    }
  })
  description = req.body.description;
  duration = req.body.duration;
  date = new Date(req.body.date).toDateString() || new Date().toDateString();
  
  exer = {username, description, duration: parseInt(duration), date, _id};

  // exerLogs.forEach((item) => {
  //   if (item._id === _id) {
  //     // if found, add the exercise to the log.
  //     item.log.push(exer);
  //     console.log(exerLogs);
  //     res.json(exer);
  //     return;
  //   }
  //   // if not found, create a new log.
  //   exerLogs.push({ _id, log: [exer] });
  //   console.log(exerLogs);
  // })
  // exerLogs.push({ _id, log: exer});
  exerLogs.push(exer);
  // console.log(exer, exerLogs);
  res.json(exer);

  
  
  
  
})


// 1-5

app.get("/api/users/:_id/logs", (req, res) => {
  //        {
  //          username: "fcc_test",
  //          count: 1,
  //          _id: "5fb5853f734231456ccb3b05",
  //          log: [{
  //           description: "test",
  //           duration: 60,
  //           date: "Mon Jan 01 1990",
  //          }]
  //        }


  let count, username, _id, from, to, limit;
  let log = [];
  count = 0;
  
  // get _i
  _id = req.params._id;
  // looking for the _id's exercise log
  exerLogs.forEach((item) => {
    if (item._id === _id) {
      // if found, return the log. 
      // ++count;
      username = item.username;
      description = item.description;
      duration = item.duration;
      date = item.date;
      // date = date.date.toDateString();
      let tempObj = { description, duration, date } 
      log.push(tempObj);
    }
  })
  // console.log({ username, count, _id, log });
  
  // return
  // console.log({username, count, _id, log });

  // add from and to query parameters to filter the logs by date.
  from = req.query.from;
  to = req.query.to;
  // console.log(from, to);
  if (from && to) { 
    console.log(from, to, 'from && to 被执行了');
    from = new Date(from);
    to = new Date(to);
    log = log.filter((item) => {
      let itemDate = new Date(item.date);
      return itemDate >= from && itemDate <= to;
    })
  }
  // add limit
  limit =req.query.limit;
  if (limit) {
    console.log('limit 被执行了');
    limit = parseInt(limit);
    log = log.slice(0, limit); 
  }

  count = log.length;

  res.json({ username, count, _id, log })

 
})



// ===========================My codes==================================================




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
