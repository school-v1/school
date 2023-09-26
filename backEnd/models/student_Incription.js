module.exports = (sequelize, DataTypes) => {
  const Student_Incription = sequelize.define("Student_Incription", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    First_Name : {
      type : DataTypes.STRING,
      allowNull: false,
    } , 

    Last_Name : {
      type : DataTypes.STRING,
      allowNull: false,
    } , 

Date_of_Birthday : {
      type : DataTypes.INTEGER,
      allowNull: false,
    } , 
    
    Current_Class : {
      type : DataTypes.STRING,
      allowNull: false,
    } ,

    Current_graduation_Certificate : {
      type : DataTypes.STRING,
      allowNull:false
    },

    ParentID: {
      type: DataTypes.INTEGER,
      references: { model: "Parent", key: "id" }, // Make sure the model name matches
    },
  
  });

  Student_Incription.associate = (models) => {
    Review.belongsTo(models.Parent, {
      onDelete: "cascade",
    });
  };

  return Student_Incription;
};

