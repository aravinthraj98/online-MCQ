import connection from '../../config/connection';
import { getAdmin } from '../../database/adminQuery';
import { findAllCatagory } from '../../database/query';

const checkAdmin = (req, res) => {
  let query = getAdmin(req.body.id);
  let getcat=findAllCatagory()
  connection.query(query, function (err, results) {
    if (err) console.log(err);
    if (results.length >= 1) {
     

      connection.query(getcat,function(err,results){
          if (err) console.log(err);
          console.log(results);
           return res.render('adminHome.ejs',{results:results});

      })
     
    }
    else{
 return res.render('adminLogin.ejs', { msg: 'id not present' });
    }
  
  });
};
module.exports = {
  checkAdmin,
};
