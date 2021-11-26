module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('questionSet', {
    questionCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    question: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    option_A: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    option_B: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    option_C: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    option_D: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    setCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'categorysets',
        key: 'setCode',
        onDelete: 'cascade',
      },
    },
  });
  return question;
};
