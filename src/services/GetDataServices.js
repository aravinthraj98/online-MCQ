import { Op, TimeoutError, where } from 'sequelize';
import db, { sequelize } from '../../models';
const Category = db.category;
const CatagorySet = db.categorySet;
const testDetail = db.testDetail;
const questionSet = db.questionSet;
let categoryData = [];
// let categorySetData =[];
async function fetchCatagory() {
  let allCatagory = await Category.findAll();
  let tempData = [];

  for (let i in allCatagory) {
    tempData.push(allCatagory[i].dataValues);
  }
  categoryData = tempData;
}
async function getAllCategory() {
  if (categoryData.length > 0) {
    return categoryData;
  }
  await fetchCatagory();
  return categoryData;
}
async function fetchCategorySet(categoryCode, email) {
  // let testResult = sequelize.dialect.QueryGenerator.selectQuery('testDetails',
  // {
  //     attributes: ['setCode'],
  //     where: {
  //          email:email
  //     }
  // })
  // .slice(0,-1);
  let testDetailquery = `select setCode from testDetails where email="${email}"`;
  // let categorySet = await CatagorySet.findAll({where:{
  //     categoryCode:categoryCode
  // }})
  let categorySet = await CatagorySet.findAll({
    where: {
      categoryCode: categoryCode,
      setCode: {
        [Op.notIn]: sequelize.literal('(' + testDetailquery + ')'),
      },
    },
  });
  console.log(categorySet);
  let tempData = [];
  for (let i in categorySet) {
    tempData.push(categorySet[i].dataValues);
  }
  console.log(tempData);
  return tempData;
}
async function getSet(setCode) {
  console.log(setCode);
  let set = await CatagorySet.findAll();

  console.log(set);
}
async function fetchQuestions(setCode) {
  let data = await questionSet.findAll({
    where: {
      setCode: setCode,
    },
  });
  let tempData = [];
  for (let i in data) {
    tempData.push(data[i].dataValues);
  }
  console.log(tempData);
  return tempData;
}
async function fetchTestDetail(email) {
  let data = await testDetail.findAll({
    where: {
      email: email,
    },
  });
  let tempData = [];
  for (let i in data) {
    tempData.push(data[i].dataValues);
  }
  return tempData;
}
async function deleteQuestion(questionCode){
  try{
    await questionSet.destroy({where:{
      questionCode:questionCode
    }});
    return true;
  }
  catch(err){
    console.log(err);
    return false;
  }

}
export {
 deleteQuestion,
  fetchCatagory,
  getAllCategory,
  getSet,
  fetchCategorySet,
  fetchQuestions,
  fetchTestDetail,
};

// const res = sequelize.query(`SELECT * FROM cities
//   WHERE country_id IN (SELECT id FROM countries WHERE lang = $lang)`, {
//   type: Sequelize.QueryTypes.SELECT,
//   bind: {
//      lang: 'French'
//});
