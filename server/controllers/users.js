// temp for creating dummy data
// var USERS = [
//   {name: "Mike", _id: 1, createdAt: new Date(), updatedAt: new Date(),
//     score: 3},
//   {name: "Alf", _id: 2, createdAt: new Date(), updatedAt: new Date(),
//     score: 2},
// ]
// var QUESTIONS = [
//   {question: "Mike", correct_answer: "a", false_answer2: "b", false_answer1: "c", _id:1},
//   {question: "Alf", correct_answer: "a", false_answer1: "b", false_answer2: "c", _id:2},
//   {question: "Bill", correct_answer: "a", false_answer1: "b", false_answer2: "c", _id:3},
// ]

const mongoose = require("mongoose")
const User = mongoose.model("User")
const Bucket = mongoose.model("Bucket")

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name})
        .then(data => {
          if(data){
            // save to session
            req.session.user_id = data._id;
            console.log("user found in db")
            console.log(req.session)
            res.json(true);
          } else {
            let new_user = new User({name: req.body.name});
            new_user.save()
              .then(user => {
                //save into session
                console.log("user entered into db");
                req.session.user_id = new_user._id;
                res.json(true);
              })
              .catch(err => res.status(500).json(err))
          }
        })
    // test using dummy data
    // USERS.push({name: req.body.name, _id: USERS[USERS.length-1]._id + 1,
    //   score: req.body.score,
    //   createdAt: new Date(), updatedAt: new Date()});
    // console.log(USERS);
    // req.session.name = req.body.name;
    // res.json(USERS)
    // res.json(Users)
  },

  user_update: function(req,res) {
    console.log("updating user with id" + req.body._id);
    console.log("POST DATA", req.body);
    User.findOne({_id: req.body._id}, function(err, user) {
      if(err) {
        console.log('something went wrong');
        // return res.redirect('/');
      } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully updated a user');
          // let user_to_update = new User({name: req.body.name})
          user.bucket_ids = req.body.bucket_ids;
          user.save(function(err){
            console.log(user);
            // res.redirect('/');
          })
          res.json(true);
      }
    })
  },

  add_bucket_item: (req, res) => {
    Bucket.findOne({title: req.body.title})
        .then(data => {
          if(data){
            console.log("bucket item already exists.");
            res.redirect('/');
    //         res.json(true)
          } else {
            let new_bucket_item = new Bucket({title: req.body.title,
                                  description: req.body.description,
                                  createdBy: req.body.createdBy,
                                  });
            new_bucket_item.save()
              .then(question => {
                res.json(true)
              })
              .catch(err => res.status(500).json(err))
          }
        })
    // test using dummy data
    // console.log("inserting question into DB");
    // console.log(req.body);
    // QUESTIONS.push({ question: req.body.question,
    //               correct_answer: req.body.correct_answer,
    //               false_answer1: req.body.false_answer1,
    //               false_answer2: req.body.false_answer2,
    //               _id: QUESTIONS[QUESTIONS.length-1]._id + 1,
    //               });
    // console.log(QUESTIONS);
    // res.json(QUESTIONS);
  },

  get_bucket_item: (req, res) => {
      console.log(req.body)
       Bucket.findOne({title: req.body.title})
        .then(data => {
          console.log("Bucket item is",data);
          res.json(data);
        })
        .catch(err => res.status(500).json(err))
   },

   get_user_by_name: (req, res) => {
       console.log(req.body)
        User.findOne({name: req.body.name})
         .then(data => {
           console.log("User found by name is",data);
           res.json(data);
         })
         .catch(err => res.status(500).json(err))
    },

    get_user_by_id: (req, res) => {
        console.log("Here is the incoming req body:", req.body)
         User.findOne({_id: req.body.id})
          .then(data => {
            console.log("User found by id is",data);
            res.json(data);
          })
          .catch(err => res.status(500).json(err))
     },

  index: (req,res) => {
    // console.log(USERS);
    // res.json(USERS);
    console.log(req.session)
    User.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
  },

  get_bucket_list: (req,res) => {
    console.log(req.session)
    Bucket.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
  },

  // all_questions: (req,res) => {
  //   // console.log(USERS);
  //   // res.json(QUESTIONS);
  //   console.log(req.session)
  //   Question.find()
  //     .then(data => res.json(data))
  //     .catch(err => res.status(500).json(err))
  // },

  get_logged_in_user: (req, res) => {
    if(req.session.user_id) {
      console.log("getting user");
      // res.json(USERS[0]);
      User.findOne({_id: req.session.user_id})
        .then(user => {
          console.log(user);
          res.json(user);
        })
        .catch(err => res.status(500).json(err))
    } else {
      res.json(false);
    }
  },

  logout: (req,res) => {
    req.session.destroy();
    // console.log(req.session.name)
    res.redirect("/")
  }
}
