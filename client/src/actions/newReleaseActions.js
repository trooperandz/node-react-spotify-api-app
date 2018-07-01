// For new releases container
import axios from 'axios';

import { 
  FETCH_NEW_RELEASES,
  RECEIVE_NEW_RELEASES,
  REQUEST_NEW_RELEASES,
} from './actionTypes';

function fetchNewReleases() {
  return (dispatch) => {
    dispatch(requestNewReleases());

    axios.get('/spotify/new-releases')
      .then((response) => {
        console.log('response: ', response);
        dispatch(receiveNewReleases(response.data.albumArr));
      })
      .catch((error) =>  {
        console.log(error);
      });
  }
}

// TODO: add a loader here?
function requestNewReleases() {
  return {
    type: REQUEST_NEW_RELEASES,
  };
}

function receiveNewReleases(albumArr) {
  return {
    type: RECEIVE_NEW_RELEASES,
    payload: albumArr,
  };
}

export default {
  requestNewReleases,
  fetchNewReleases,
  receiveNewReleases,
};