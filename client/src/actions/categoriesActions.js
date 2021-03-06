// For new releases container
import axios from 'axios';

import {
  FETCH_CATEGORIES,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_CATEGORY_ID,
  SET_SELECTED_CATEGORIES_OBJ,
} from './actionTypes';

function fetchCategories(categoryId) {
  return (dispatch) => {
    dispatch(requestCategories());

    axios.get(`/categories?categoryId=${categoryId}`)
      .then((response) => {
        dispatch(receiveCategories(response.data.categoriesArr));
      })
      .catch((error) =>  {
        console.log(error);
      });
  }
}

function setCategoryId(selectedCategoryId) {
  return {
    type: SET_CATEGORY_ID,
    selectedCategoryId,
  };
}

// TODO: add a loader here...
function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  };
}

function receiveCategories(categoriesArr) {
  return {
    type: RECEIVE_CATEGORIES,
    categoriesArr,
  };
}

function setSelectedCategoriesObj(selectedCategoriesObj) {
  return {
    type: SET_SELECTED_CATEGORIES_OBJ,
    selectedCategoriesObj,
  }
}

export default {
  requestCategories,
  fetchCategories,
  receiveCategories,
  setCategoryId,
  setSelectedCategoriesObj,
};