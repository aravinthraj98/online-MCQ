import db from '../../models';
const Category = db.category;
let categoryData =[];
async function fetchCatagory(){
    let allCatagory =await Category.findAll();
    let tempData=[];
    
    for( let i in allCatagory){
        tempData.push(allCatagory[i].dataValues);
    }
    categoryData=tempData;
    

}
function getAllCategory(){
    
    return categoryData;
}
export {fetchCatagory,getAllCategory};