import db from '../../models';
const Category = db.category;
let categoryData =[];
async function fetchCatagory(){
    let allCatagory =await Category.findAll();
    
    for( let i in allCatagory){
        categoryData.push(allCatagory[i].dataValues);
    }
    

}
function getAllCategory(){
    
    return categoryData;
}
export {fetchCatagory,getAllCategory};