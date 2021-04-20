const getAdmin = (email) => {
  let query = `select * from admin where adminId="${email}"`;
  return query;
};
const addCatagoryquery = (catagoryCode, catagoryName) => {
  let query = `insert into catagory values("${catagoryCode}","${catagoryName}")`;
  return query;
};


module.exports = {
  getAdmin,
  addCatagoryquery,
};
