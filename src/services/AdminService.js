import db from '../../models';
const admin = db.admin;
const category = db.category;
const set = db.categorySet;
async function AdminLogin(username, password) {
  let isadmin = await admin.findOne({ where: { username, password } });
  if (isadmin == null) {
    return false;
  } else {
    return true;
  }
}
async function AddCategory(categoryCode, categoryName) {
  let isCatagory = await category.findOne({ where: { categoryCode } });
  if (isCatagory == null) {
    await category.create({ categoryCode, categoryName });
    return true;
  } else {
    return 'already catagory code present';
  }
}
async function AddSet(
  setCode,
  setName,
  setDescription,
  timeLimit,
  categoryCode
) {
  console.log(setCode);
  let isnewSet = await set.create({
    setCode,
    setDescription,
    setName,
    timeLimit,
    categoryCode,
  });
  if (isnewSet == null) {
    return false;
  } else {
    return true;
  }
}

async function getAllSet() {
  let Set = await set.findAll();
  let AllSet = [];
  for (let i in Set) {
    AllSet.push(Set[i].dataValues);
  }
  console.log(AllSet);
  return AllSet;
}
export { AdminLogin, AddCategory, AddSet, getAllSet };
