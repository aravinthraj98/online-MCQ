import db from '../../models';
const User = db.user;
function newUser(email, username, password) {
  User.create({ email, username, password }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
}
function checkLogin(email, password) {
  const isuser = User.findOne({
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
export { newUser, checkLogin };
