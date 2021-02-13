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
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    watched: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' },
    }  
  }, {});
  Collection.associate = function(models) {
    Collection.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Collection;
};