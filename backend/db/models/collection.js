'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pictures: {
      type: DataTypes.TEXT,
    },
    movieId: {
      type: DataTypes.INTEGER,
    },
    watched: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: 'userId'
    }  
  }, {});
  Collection.associate = function(models) {
    Collection.belongsTo(models.User);
  };
  return Collection;
};