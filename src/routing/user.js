
import express from "express"
import { getAllCategory, getSet,fetchCategorySet } from "../services/GetDataServices";
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
  
  return res.send("starting test");
})
router.get("/:id",async (req,res)=>{
  let id = req.params.id;
  let data = await fetchCategorySet(id,req.cookies.email);
  return res.render("SetView.ejs",{results:data})
  // return res.send(id)
})
export default router;