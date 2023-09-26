module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define("Parent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date_Of_birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone_Number:{
      type:DataTypes.STRING,
      allowNull:false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password : {
      type: DataTypes.STRING,
      allowNull:false
    },

   
   
  });

  Parent.associate = (models) => {
    Parent.hasMany(models.Students, {
      onDelete: "cascade",
    });
    Parent.hasMany(models.Payment, {
      onDelete: "cascade",
    });
    Parent.hasMany(models.Message, {
      onDelete: "cascade",
    });
    Parent.hasMany(models.Notes, {
      onDelete: "cascade",
    });
  };

  return Parent;
};
