import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); // use call () whenever you need to convert a function to a effect itt need a callable method na dthat method's arguments
    yield put(fetchCategoriesSuccess(categoriesArray)); // use put instead of dispatch here in sagas generators
  } catch (error) {
    put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); // take is where we receieve action ; take lateste is if you hear a bunch of actions giv eme the latest one
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // pause for this sate as don't move forward until this is complete expectes array of diff. things to be executd
}
