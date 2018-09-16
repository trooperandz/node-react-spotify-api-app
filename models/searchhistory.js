'use strict';

// Stores search terms that the user has submitted
module.exports = function(sequelize, DataTypes) {
  const SearchHistory = sequelize.define('SearchHistory', {
    search_term: { type: DataTypes.STRING, allowNull: false }, // displayed in the interface
    search_type: { type: DataTypes.ENUM('album'), allowNull: false }, // required with the Spotify search param
  }, {
    classMethods: {
      associate: function(models) {
        // this is a pretty simple db; we don't need any associations...
      },
    },
  });
  return SearchHistory;
};