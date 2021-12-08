import express from 'express';
import {
  AddCategory,
  AddSet,
  AdminLogin,
  getAllSet,
} from '../services/AdminService';
import { fetchCatagory, getAllCategory } from '../services/GetDataServices';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import db from '../../models';
const questionSet = db.questionSet;
const router = express.Router();
const xlsxFile = require('read-excel-file/node');
router.post('/addCatagory', async (req, res) => {
  let catagoryCode = req.body.catagoryCode;
  let catagoryName = req.body.catagoryName;
  try {
    let isCreate = await AddCategory(catagoryCode, catagoryName);

    if (isCreate) {
      await fetchCatagory();
    }
    return res.send(isCreate);
  } catch (err) {
    if (err.parent.errno == 1062) {
      return res.send('All ready category code present');
    }
    return false;

    
  }
});

router.post('/addSet', async (req, res) => {
  console.log(req.body);
  let setCode = req.body.setCode;
  let setName = req.body.setName;
  let setDescription = req.body.setDescription;
  let categoryCode = req.body.categoryCode;
  console.log(categoryCode);
  let timeLimit = req.body.timeLimit;
  try {
    let isSet = await AddSet(
      setCode,
      setName,
      setDescription,
      timeLimit,
      categoryCode
    );
    let listCat = getAllCategory();
    if (isSet) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (err) {
    console.log({ err: err.parent.errno });
    if (err.parent.errno == 1062) {
      return res.send('Alreadt set number exist');
    }
    return res.send('some error occured');
  }
});
router.get('/', (req, res) => {
  return res.render('adminLogin.ejs');
});
router.post('/login', async (req, res) => {
  let username = req.body.id;
  let password = req.body.password;
  let isadmin = await AdminLogin(username, password);
  console.log(isadmin);
  let listCat = await getAllCategory();
  if (isadmin) {
    return res.render('adminHome.ejs', { results: listCat });
  } else {
    return res.render('adminLogin.ejs', { msg: 'username or password wrong' });
  }
});

router.get('/getSet', async (req, res) => {
  let AllSet = await getAllSet();
  return res.send(AllSet);
});
router.post('/fileupload', (req, res, next) => {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    req.body = fields;
    // console.log({ fields });
    var oldpath = files.filetoupload.path;
    console.log(oldpath);
    var newpath = path.join('./assets/' + 'upload.xlsx');
    console.log(newpath);
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
router.get('/getCategory', async (req, res) => {
  let getCat = await getAllCategory();
  res.send(getCat);
});
router.post('/fileupload', async (req, res) => {
  let getFile = path.join('./assets/upload.xlsx');
  // let bulkInsert = [];
  let result = [];
  let isInserted = false;
  let setCode = req.body.setCode;
  console.log(setCode);
  await xlsxFile(getFile).then(async (row) => {
    let header = row[0];

    for (let i in row) {
      if (i == 0) continue;
      let newRow = {};
      for (let j in row[i]) {
        if (header[j] == 'answer') {
          newRow[header[j]] = newRow[row[i][j]];
        } else newRow[header[j]] = row[i][j];
      }
      // setCode = 'aa';
      if (newRow['setCode'] != setCode) {
        isInserted = false;
        return;
      }
      result.push(newRow);
    }
    console.log(result);
    try {
      isInserted = await questionSet.bulkCreate(result).then((res) => {
        return true;
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(isInserted);

    // console.log(isInserted);
  });
  // console.log('Helooooooooo');
  if (isInserted == true) return res.send('Inserted');
  res.send('some error occured');
  // return res.send('Not inserted');
});

export default router;
