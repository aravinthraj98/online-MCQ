import db from '../../models';
const User = db.user;
const testDetail = db.testDetail;

function passwordEncrypt(password) {
  let newPassword = '';
  for (let i in password) {
    newPassword += '' + password[i].charCodeAt(0);
  }
  console.log(newPassword);
  return newPassword;
  //4950515253545556
}
async function newUser(email, username, password) {
  password = passwordEncrypt(password);
  await User.create({ email, username, password }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
}
async function checkLogin(email, password) {
  password = passwordEncrypt(password);
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
