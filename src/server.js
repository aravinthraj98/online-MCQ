import express from 'express';
import {
  showCatagory,
  query,
  showSet,
  listCatagory,
  checkAnswer,
  // checkLogin,
} from './database/db';
import db from './../models';

import {
  findAllCatagory,
  findCatagorySet,
  findSet,
  getAnswer,
} from './database/query';
import {fetchCatagory,getAllCategory} from "./services/GetDataServices"
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
import { callbackify } from 'util';
import { newUser, checkLogin, checkUser } from './services/UserServices';
import {AdminLogin,AddCategory, AddSet} from "./services/AdminService"
import MountApp from './routing';

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
app.get('/t', async (req, res) => {
  console.log('ff');
  // await newUser('aravinth@gmail.com', 'aravinth', 'aravinth');
  let check = await checkLogin('aravinth@gmail.com', 'aravinth');
  console.log('login' + check);
  res.send('new User');
});
MountApp(app);
app.get('/test', (req, res) => {
  let getFile = path.join('./assets/upload.xlsx');
  xlsxFile(getFile).then((row) => {});

  // connection.query(query, function (err, results) {
  //   if (err) console.log(err);
  //   res.send('updated');
  // });
});

// });
app.post('/fileupload', (req, res, next) => {
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
    console.log(row);
  });
  let getcat = findAllCatagory();

  connection.query(getcat, function (err, results) {
    if (err) console.log(err);
    console.log(results);
    return res.render('adminHome.ejs', { results: results });
  });

  // connection.query(query, function (err, results) {
  //   if (err) console.log(err);
  //   res.send('updated');
  // });
});

app.get('/cor', (req, res) => {
  res.json({ msg: 'hello cors dai' });
});


app.get('/:cat', showCatagory);
app.get('/:cat/:set', showSet);

app.post('/:cat/submit', checkAnswer);
db.sequelize.sync().then((req) => {
  app.listen(3323, () => {
    fetchCatagory();
    console.log(`http://localhost:3323`);
  });

  //
  //
  // console.log(queryCategory)

  // let h=findSet(queryCategory);
  // console.log({h})

  // let e = await query(h);
  // console.log(`connected -> ${e}`)
});
