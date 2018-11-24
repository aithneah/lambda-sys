import Actions from "../actions";
import { takeEvery } from 'redux-saga/effects';
import { getAccountData } from "./getAccountDataSaga";
import {getAllDeclarationsData} from "./getAllDeclarationsSaga";

export function* rootSaga() {
    yield takeEvery(Actions.getAccountData.Type, getAccountData);
    yield takeEvery(Actions.getAllDeclarationsData.Type, getAllDeclarationsData);
}