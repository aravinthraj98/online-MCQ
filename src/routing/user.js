import express from 'express';
import { saveResult } from '../database/query';
import {
  getAllCategory,
  getSet,
  fetchCategorySet,
  fetchQuestions,
  fetchTestDetail,
} from '../services/GetDataServices';
import {
  checkLogin,
  checkUser,
  newUser,
  saveTest,
} from '../services/UserServices';

const router = express.Router();
router.get('/', (req, res) => {
  console.log({ email: req.cookies.email });
  if (req.cookies.email) return res.redirect('/catagory');
  res.render('home.ejs');
});
router.get('/logout', (req, res) => {
  console.log();
  // res.cookie().destroy();
  res.cookie('email', '');

  return res.render('home.ejs');
});
router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let isuser = await checkLogin(email, password);
  if (isuser) {
    res.cookie('email', email);
    return res.redirect('/catagory');
  } else {
    return res.render('home.ejs', {
      msg: 'password not valid',
    });
  }
});
router.post('/signup', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword;
  let name = req.body.name;
  if (password != confirmpassword)
    return res.render('home.ejs', {
      msg: 'password and confirm password shoud be same',
    });
  let isuser = await checkUser(email);
  if (isuser == true) {
    return res.render('home.ejs', {
      msg: 'User Present',
    });
  } else {
    await newUser(email, name, password);
  }
  res.cookie('email', email);
  return res.redirect('/catagory');
});

router.get('/catagory', async (req, res) => {
  if (!req.cookies.email) return res.redirect('/');

  let listCat = await getAllCategory();
  let msg = 'Welcome!!';
  console.log(req.query.noquestion);
  if (req.query.noquestion == 'true') {
    msg = 'The test you willing to take is no longer available';
  }
  //  emconsole.log(listCat);
  return res.render('CatagoryView.ejs', { list: listCat, msg });
});
router.post('/submitTest', async (req, res) => {
  if (req.session.exam === 'writing' && req.session.cookie.maxAge) {
    let setCode = req.body.setCode;
    let results = await fetchQuestions(setCode);
    let correct = 0;
    let wrong = 0;
    for (let i in results) {
      if (
        req.body[results[i].questionCode] &&
        req.body[results[i].questionCode] == results[i].answer
      ) {
        correct++;
      } else {
        wrong++;
      }
    }
    console.log(req.cookies.email);
    let data = {
      email: req.cookies.email,
      testScore: (correct / (correct + wrong)) * 100,
      testTime: req.session.time - req.session.cookie.maxAge / (60 * 1000),

      setCode: setCode,
    };
    let isSaved = await saveTest(data);
    console.log({ isSaved });
    if (!isSaved) return res.send('some error occured ,please try again later');
    req.session.destroy();

    return res.render('resultView', { setCode, correct, wrong });
  }

  return res.send('No test');
});

router.get('/category/set/:set', async (req, res) => {
  if (!req.cookies.email) return res.redirect('/');
  let setCode = req.params.set;
  let testMin = req.query.testMin;
  let results = await fetchQuestions(setCode);
  if (results.length <= 0) return res.redirect('/catagory?noquestion=true');
  req.session.exam = 'writing';
  req.session.time = testMin;
  req.session.cookie.maxAge = testMin * 60 * 1000;
  console.log('session created');
  return res.render('testPage.ejs', { results, set: setCode, testMin });

  //  let questions = await
  //  let questions =
  //  let query = findSet(set);
  // connection.query(query, function (err, results) {
  //   if (err) {
  //     console.log(err.message);
  //     console.log('no connection');
  //   }

  //   let testMin = 120;
  //   req.session.exam = 'writing';
  //   req.session.cookie.maxAge = 100 * 1000;
  //   console.log('session created');

  //   res.render('testPage.ejs', { results, set, testMin });
  // });
  return res.send('starting test');
});
router.get('/category/:id', async (req, res) => {
  let id = req.params.id;
  let data = await fetchCategorySet(id, req.cookies.email);
  return res.render('SetView.ejs', { results: data });
  // return res.send(id)
});

router.get('/testDetail', async (req, res) => {
  if (!req.cookies.email) return res.redirect('/');
  let data = await fetchTestDetail(req.cookies.email);
  return res.render('testDetail.ejs', { data: data });
});
export default router;
