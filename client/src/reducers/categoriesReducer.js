// categories reducer

import { FETCH_CATEGORIES, RECEIVE_CATEGORIES, SET_CATEGORY_ID } from '../actions/actionTypes';

const initialState = {
  categoriesArr: [],
  selectedCategoryId: 'jazz',
};

export default function categoriesReducer(state = initialState, action) {
  const { categoriesArr, selectedCategoryId } = action;
  let newState;

  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log('FETCH_CATEGORIES Action')
      return action;
    case RECEIVE_CATEGORIES:
      console.log('RECEIVE_CATEGORIES Action')
      newState = {
        ...state,
        categoriesArr,
      };
      return newState;
    case SET_CATEGORY_ID:
      console.log('SET_CATEGORY_ID Action')
      newState = {
        ...state,
        selectedCategoryId,
      };
      return newState;
    default:
      return state;
  }
}
