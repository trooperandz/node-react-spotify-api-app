// For new releases container
import axios from 'axios';

import { 
  FETCH_CATEGORIES,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from './actionTypes';

function fetchCategories() {
  return (dispatch) => {
    dispatch(requestCategories());

    axios.get('/spotify/categories')
      .then((response) => {
        console.log('response: ', response);
        dispatch(receiveCategories(response.data.categoriesArr));
      })
      .catch((error) =>  {
        console.log(error);
      });
  }
}

// TODO: add a loader here?
function requestCategories() {
  console.log('hit requestCategories...');
  return {
    type: REQUEST_CATEGORIES,
  };
}

function receiveCategories(categoriesArr) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: categoriesArr,
  };
}

export default {
  requestCategories,
  fetchCategories,
  receiveCategories,
};