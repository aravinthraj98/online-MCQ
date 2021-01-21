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
import { findCatagorySet, findSet, getAnswer } from './database/query';
import bodyparser from 'body-parser';
import ejs from 'ejs';
import path from 'path';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

const app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.set('views', path.join(__dirname + '/views'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors());
app.use(
  session({
    secret: 'login',
    cookie: { expires: 60 * 60 * 60 * 1000 }, // Approximately Friday, 31 Dec 9999 23:59:59 GMT
  })
);
app.get('/cor', (req, res) => {
  res.json({ msg: 'hello cors dai' });
});
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

app.listen(3333, () => {
  console.log(`http://localhost:3333`);

  //
  //
  // console.log(queryCategory)

  // let h=findSet(queryCategory);
  // console.log({h})

  // let e = await query(h);
  // console.log(`connected -> ${e}`)
});
