// categories reducer

import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_CATEGORY_ID,
  SET_SELECTED_CATEGORIES_OBJ,
} from '../actions/actionTypes';

const initialState = {
  categoriesArr: [],
  selectedCategoryId: 'jazz', // show "jazz" category on initial load
  selectedCategoriesObj: { id: 'jazz', name: 'Jazz' },
};

export default function categoriesReducer(state = initialState, action) {
  const { categoriesArr, selectedCategoryId, selectedCategoriesObj } = action;
  let newState;

  switch (action.type) {
    case FETCH_CATEGORIES:
      return action;
    case RECEIVE_CATEGORIES:
      newState = {
        ...state,
        categoriesArr,
      };
      return newState;
    case SET_CATEGORY_ID:
      newState = {
        ...state,
        selectedCategoryId,
      };
      return newState;
    case SET_SELECTED_CATEGORIES_OBJ:
      newState = {
        ...state,
        selectedCategoriesObj,
      };
      return newState;
    default:
      return state;
  }
}
