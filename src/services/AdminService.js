import db from "../../models"
const admin = db.admin;
const category = db.category;
async function AdminLogin(username,password){
   let isadmin =await admin.findOne({where:{username,password}});
   if(isadmin==null){
       return false;

   }
   else{
 return true;
   }
  
    

}
async function AddCategory(categoryCode,categoryName){
 
        let isCatagory =await category.findOne({where:{categoryCode}});
        if(isCatagory==null){
         await category.create({categoryCode,categoryName});
          return true;
        }
        
        else{
            return "already catagory code present";
        }


   
}
export {AdminLogin,AddCategory};