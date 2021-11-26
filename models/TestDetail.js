// const CategorySet = require("./CategorySet");

const { QueryInterface } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TestDetail = sequelize.define('testDetail', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
 
      validate: {
        notEmpty: true,
      },
    },
   
    setCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
          model:'categorysets',
          key:'setCode',
          sonDelete: 'cascade',
      }
     
    },
    // categoryCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //  references:{
    //       model:'categories',
    //       key:'categoryCode'
    //   }
    //},
    testTime:{
        type:DataTypes.INTEGER
      
    },
     testScore:{
        type:DataTypes.INTEGER,
     
    },
    
   
    
  });
  TestDetail.removeAttribute("id")

  

  return TestDetail;
};
// CREATE TABLE IF NOT EXISTS `testDetails` (`id` INTEGER NOT NULL auto_increment , `email` VARCHAR(255) NOT NULL, `setCode` VARCHAR(255) NOT NULL, `testTime` NUMBER, `testScore` NUMBER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`setCode`) REFERENCES `categorysets` (`setCode`)) ENGINE=InnoDB
