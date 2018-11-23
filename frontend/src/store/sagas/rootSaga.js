import Actions from "../actions";
import { takeEvery } from 'redux-saga/effects';
import { getAccountData } from "./getAccountDataSaga";

export function* rootSaga() {
    yield takeEvery(Actions.getAccountData.Type, getAccountData);
}