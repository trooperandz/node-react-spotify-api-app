'use strict';

// Stores albums/playlists that the user has loaded
module.exports = function(sequelize, DataTypes) {
  const PlayHistory = sequelize.define('PlayHistory', {
    item_id: { type: DataTypes.STRING, allowNull: false }, // Spotify unique album or playlist id
    item_type: { type: DataTypes.ENUM('albums', 'playlists'), allowNull: false }, // required with the api call route
    item_name: { type: DataTypes.STRING, allowNull: false }, // displayed in the interface, the name of the album or playlist
  }, {
    classMethods: {
      associate: function(models) {
        // this is a pretty simple db; we don't need any associations...
      },
    },
  });
  return PlayHistory;
};