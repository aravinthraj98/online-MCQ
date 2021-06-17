import express from 'express';
import { AddCategory, AddSet, AdminLogin } from '../services/AdminService';
import { fetchCatagory, getAllCategory } from '../services/GetDataServices';

const router = express.Router();

router.post('/addCatagory', async (req, res) => {
  let catagoryCode = req.body.catagoryCode;
  let catagoryName = req.body.catagoryName;
  let isCreate = await AddCategory(catagoryCode, catagoryName);
  if (isCreate) {
    await fetchCatagory();
  }
  return res.send(isCreate);
});

router.post('/addSet', async (req, res) => {
  console.log(req.body);
  let setCode = req.body.setCode;
  let setName = req.body.setName;
  let setDescription = req.body.setDescription;
  let categoryCode = req.body.categoryCode;
  console.log(categoryCode);
  let timeLimit = req.body.timeLimit;
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
});
router.get('/', (req, res) => {
  return res.render('adminLogin.ejs');
});
router.post('/login', async (req, res) => {
  let username = req.body.id;
  let password = req.body.password;
  let isadmin = await AdminLogin(username, password);
  console.log(isadmin);
  let listCat = getAllCategory();
  if (isadmin) {
    return res.render('adminHome.ejs', { results: listCat });
  } else {
    return res.render('adminLogin.ejs', { msg: 'username or password wrong' });
  }
});

export default router;
