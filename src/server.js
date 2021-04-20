import express from 'express';
import {
  showCatagory,
  query,
  showSet,
  listCatagory,
  checkAnswer,
  checkLogin,
  checkUser,
  saveUser,
} from './database/db';

import {
  findAllCatagory,
  findCatagorySet,
  findSet,
  getAnswer,
} from './database/query';
import bodyparser from 'body-parser';
import ejs from 'ejs';
import { checkAdmin } from './controllers/admin/admin';
import path from 'path';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import formidable from 'formidable';
import { addCatagoryquery } from './database/adminQuery';
import fs from 'fs';
import connection from './config/connection';
import { Console } from 'console';

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.set('views', path.join(__dirname + '/views'));
app.use(bodyparser.urlencoded({ extended: false }));
const xlsxFile = require('read-excel-file/node');
app.use(cookieparser());
app.use(cors());
app.use(
  session({
    secret: 'login',
    cookie: { expires: 60 * 60 * 60 * 1000 }, // Approximately Friday, 31 Dec 9999 23:59:59 GMT
  })
);
app.get('/t', (req, res) => {
  console.log('ff');
  connection.query(findAllCatagory(), function (err, results) {
    if (err) console.log(err);
    res.render('adminHome.ejs', { results });
  });
});
app.get('/test', (req, res) => {
  let getFile = path.join('./assets/upload.xlsx');
  xlsxFile(getFile).then((row) => {});

  // connection.query(query, function (err, results) {
  //   if (err) console.log(err);
  //   res.send('updated');
  // });
});
app.post('/addCatagory', (req, res) => {
  let catagoryCode = req.body.catagoryCode;
  let catagoryName = req.body.catagoryName;
  let query = addCatagoryquery(catagoryCode, catagoryName);
  connection.query(query, function (err, results) {
    if (err) {
      return res.send(err.sqlMessage);
    }
    res.send(true);
  });
});
app.post('/fileupload', (req,res,next) => {
  var form = new formidable.IncomingForm();
  

  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = path.join('./assets/' + 'upload.xlsx');

    try {
      fs.rename(oldpath, newpath, function (err) {
        if (err) console.log(err);
        next();

       // return res.send('file uploadedddd');
      });
    } catch (err) {
      console.log(err);
    }
  });
});

app.post('/fileupload', (req, res) => {
  let getFile = path.join('./assets/upload.xlsx');

  xlsxFile(getFile).then((row) => {
   
  });

  // connection.query(query, function (err, results) {
  //   if (err) console.log(err);
  //   res.send('updated');
  // });
});
app.get('/cor', (req, res) => {
  res.json({ msg: 'hello cors dai' });
});
app.get('/admin', (req, res) => {
  return res.render('adminLogin.ejs');
});
app.post('/admin/login', checkAdmin);

app.get('/', (req, res) => {
  res.render('home.ejs');
});
app.post('/login', checkLogin);
app.post('/signup', checkUser, saveUser);

app.get('/catagory', listCatagory);

app.get('/:cat', showCatagory);
app.get('/:cat/:set', showSet);

// console.log(req.params.catagory)
// if(req.params.set){
//     let set= findSet(req.params.set)
//     const quer=await query(set);
//     console.log(set)
//     console.log(quer);
app.post('/:cat/submit', checkAnswer);

app.listen(3323, () => {
  console.log(`http://localhost:3323`);

  //
  //
  // console.log(queryCategory)

  // let h=findSet(queryCategory);
  // console.log({h})

  // let e = await query(h);
  // console.log(`connected -> ${e}`)
});
