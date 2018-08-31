// Shared utility functions

/**
 * Format the spotify album results for album cards displayed in CardContainer
 * @param {Array} albums An array of album objects
 * @return {Array} An array of formatted album objects
 */
function formatAlbumCards(albums) {
  const formattedAlbumCardArr = albums.reduce((arr, album) => {
    const {
      id: albumId,
      artists,
      name: albumName,
      images,
      release_date: releaseDate,
      href: albumHref,
    } = album;

    const albumObj = {
      albumId,
      artist: artists[0].name,
      albumName,
      imgUrl: images[1].url,
      releaseDate,
      albumHref,
    };

    arr.push(albumObj);

    return arr;
  }, []);

  return formattedAlbumCardArr;
}

/**
 * Format the spotify category results for playlist cards displayed in CardContainer
 * @param {Array} albums An array of category (playlist) objects
 * @return {Array} An array of formatted category (playlist) objects
 */
function formatCategoryCards(categoriesArr) {
  const formattedCategoryCardArr = categoriesArr.reduce((arr, category) => {
    const {
      id: playlistId,
      name: playlistName,
      owner: { id: ownerId },
      images,
      href: categoryHref,
    } = category;

    const categoryObj = {
      playlistId,
      playlistName,
      ownerId,
      imgUrl: images[0].url,
      categoryHref,
    };

    arr.push(categoryObj);

    return arr;
  }, []);

  return formattedCategoryCardArr;
}

module.exports = {
  formatAlbumCards,
  formatCategoryCards,
};