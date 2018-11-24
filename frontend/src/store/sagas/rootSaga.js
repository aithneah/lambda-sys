import Actions from "../actions";
import { takeEvery } from 'redux-saga/effects';
import { getAccountData } from "./getAccountDataSaga";
import {getAllDeclarationsData} from "./getAllDeclarationsSaga";
import {getDeclarationStructureData} from "./getDeclarationStructureDataSaga";
import {getAllGroupsData} from "./getAllGroupsDataSaga";

export function* rootSaga() {
    yield takeEvery(Actions.getAccountData.Type, getAccountData);
    yield takeEvery(Actions.getAllDeclarationsData.Type, getAllDeclarationsData);
    yield takeEvery(Actions.getDeclarationStructureData.Type, getDeclarationStructureData);
    yield takeEvery(Actions.getAllGroupsData.Type, getAllGroupsData);
}