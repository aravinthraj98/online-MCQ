module.exports = (sequelize, DataTypes) => {
  const Set = sequelize.define('categorySet', {
    setCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    setName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    setDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
     categoryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Set;
};
