
import express from "express"
import { getAllCategory, getSet,fetchCategorySet, fetchQuestions } from "../services/GetDataServices";
import { checkLogin, checkUser, newUser } from "../services/UserServices";


const router =express.Router();
router.get('/', (req, res) => {
  res.render('home.ejs');
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
  return res.redirect('/catagory');
});

router.get('/catagory', async (req,res)=>{
  if(!req.cookies.email) return res.redirect("/");
       let listCat=await getAllCategory();
      //  console.log(listCat);
 return res.render('CatagoryView.ejs', { list: listCat });
});

router.get("/set/:set",async(req,res)=>{
  if(!req.cookies.email) return res.redirect("/");
 let setCode = req.params.set;
 let testMin = req.query.testMin;
 let results = await fetchQuestions(setCode);
     req.session.exam = 'writing';
    req.session.cookie.maxAge = 100 * 1000;
    console.log('session created');
   return  res.render('testPage.ejs', { results, set:setCode, testMin });
 
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
  return res.send("starting test");
})
router.get("/:id",async (req,res)=>{
  let id = req.params.id;
  let data = await fetchCategorySet(id,req.cookies.email);
  return res.render("SetView.ejs",{results:data})
  // return res.send(id)
})
export default router;