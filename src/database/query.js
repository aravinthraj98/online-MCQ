const findUser = (email) => {
  let userQuery = `select * from User where email=${email}`;
  return userQuery;
};

const findAllCatagory = () => {
  let allCourse = `select * from catagory`;
  return allCourse;
};

const findCatagorySet = (course) => {
  let getCatagorySet = `select * from catagorySet where catagoryCode="${course}"`;
  console.log({ getCatagorySet });
  return getCatagorySet;
};

const findSet = (setcode) => {
  let getSet = `select question,option_A,option_B,option_C,option_D,setCode from questionSet where setCode="${setcode}"`;
  return getSet;
};

const getAnswer = (setCode) => {
  let getAns = `select question,answer from questionSet where setCode="${setCode}"`;
  return getAns;
};
const getLogin = (email) => {
  let getLog = `select * from user where email="${email}"`;
  return getLog;
};
const findCat = (setCode) => {
  let getset = `select catagoryCode from catagorySet where setCode="${setCode}"`;
  return getset;
};

const saveUsers = (username, email, password) => {
  let save = `insert into user values("${email}","${username}","${password}")`;
  return save;
};

module.exports = {
  findCatagorySet,
  findAllCatagory,
  findSet,
  getAnswer,
  getLogin,
  findCat,
  saveUsers,
};
