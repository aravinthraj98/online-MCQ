import connection from '../config/connection';
import {
  findCatagorySet,
  findSet,
  findAllCatagory,
  getAnswer,
  getLogin,
  findCat,
  saveUsers,
  saveResult,
} from '../database/query';

const listCatagory = (req, res) => {
  let query = findAllCatagory();
  console.log(req.cookies.email);
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
    }

    let listCat = [];
    for (let i in results) {
      let catagory = {
        catagoryCode: results[i]['catagoryCode'],
        catagoryName: results[i]['catagoryName'],
      };
      listCat.push(catagory);
    }
    console.log(listCat);

    res.render('CatagoryView.ejs', { list: listCat });
  });
};

const showCatagory = (req, res) => {
  var catagory = req.params.cat;

  let result = [];
  let query = '';

  query = findCatagorySet(catagory, req.cookies.email);

  connection.query(query, function (err, results) {
    if (err) {
      console.log(err.message);
    }

    res.render('SetView.ejs', { results });
  });
};

const showSet = (req, res) => {
  var set = req.params.set;

  let query = findSet(set);
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err.message);
      console.log('no connection');
    }

    let testMin = 120;
    req.session.exam = 'writing';
    req.session.cookie.maxAge = 100 * 1000;
    console.log('session created');

    res.render('testPage.ejs', { results, set, testMin });
  });
};
const checkAnswer = async (req, res) => {
  if (!req.session.exam) return res.redirect('/catagory');
  let setcode = req.body.setCode;
  let answers = req.body;
  let query = getAnswer(setcode);
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err.message);
    }
    let correct = 0;
    let wrong = 0;

    for (let i in results) {
      if (answers[results[i]['question']] != null) {
        if (results[i]['answer'] == answers[results[i]['question']]) {
          correct = correct + 1;
        } else {
          wrong = wrong + 1;
        }
      }
    }
    let query1 = findCat(setcode);

    connection.query(query1, function (err, results) {
      if (err) console.log(err.message);
      let catagoryCode = results;
      console.log(catagoryCode[0].catagoryCode);
      let saveresult = saveResult(
        req.cookies.email,
        setcode,
        catagoryCode[0].catagoryCode,
        correct
      );
      connection.query(saveresult, function (err, results) {
        if (err) console.log(err);
        console.log('saved');
      });

      return res.render('resultView.ejs', { results, setcode, correct, wrong });
    });
  });
};

const checkLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // if(password!=confirmpassword)
  //               return res.render("home.ejs",{msg:"password and confirm password shoud be same"});
  let query = getLogin(email);
  connection.query(query, function (err, results) {
    if (err) console.log(err.message);
    if (results.length < 1) {
      return res.render('home.ejs', { msg: 'Login Id not found' });
    }
    res.cookie('email', email);

    return res.redirect('/catagory');
  });
};
const checkUser = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword;
  if (password != confirmpassword)
    return res.render('home.ejs', {
      msg: 'password and confirm password shoud be same',
    });
  let query = getLogin(email);
  connection.query(query, function (err, results) {
    if (err) console.log(err.message);
    if (results.length >= 1) {
      return res.render('home.ejs', { msg: 'Email already registered' });
    }
    next();
  });
};

const saveUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let query = saveUsers(name, email, password);
  connection.query(query, function (err, results) {
    if (err) console.log(err);
    else return res.redirect('/catagory');
  });
};

// const query = async (query) => {
//   let result = ['result'];
//   connection.query(query, function (err, results) {
//     if (err) {
//       console.log(err.message);
//     }
//     result = results;
//     console.log(result);
//   });
//   return result;
// };


module.exports = {
  showSet,
  listCatagory,
  showCatagory,

  checkAnswer,
  checkLogin,
  checkUser,
  saveUser,
};
