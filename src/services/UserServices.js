import db from '../../models';
const User = db.user;
const testDetail = db.testDetail;
async function newUser(email, username, password) {
  await User.create({ email, username, password }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
}
async function checkLogin(email, password) {
  const isuser = await User.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (isuser == null) {
    return false;
  } else {
    return true;
  }
}
async function checkUser(email) {
  const isuser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (isuser == null) {
    return false;
  } else {
    return true;
  }
}
async function saveTest(data) {
  return testDetail
    .create(data)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });
}
export { newUser, checkLogin, checkUser, saveTest };
