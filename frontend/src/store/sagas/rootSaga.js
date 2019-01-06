import Actions from "../actions";
import {takeEvery} from 'redux-saga/effects';
import {getAccountData} from "./getAccountDataSaga";
import {getAllDeclarationsData} from "./getAllDeclarationsSaga";
import {getDeclarationStructureData} from "./getDeclarationStructureDataSaga";
import {getAllGroupsData} from "./getAllGroupsDataSaga";
import {getGroupsListsData} from "./getGroupsListsDataSaga";
import {getGroupsStudentsData} from "./getGroupsStudentsDataSaga";
import {getGroupsListSummary} from "./getGroupsListSummarySaga";
import {getStudentProgress} from "./getStudentProgressSaga";
import {logOut} from "./logOutSaga";
import {updateDeclaration} from "./updateDeclarationSaga";
import {applyComment} from "./applyCommentSaga";
import {commentFromTile} from "./commentFromTileSaga";

export function* rootSaga() {
    yield takeEvery(Actions.getAccountData.Type, getAccountData);
    yield takeEvery(Actions.getAllDeclarationsData.Type, getAllDeclarationsData);
    yield takeEvery(Actions.getDeclarationStructureData.Type, getDeclarationStructureData);
    yield takeEvery(Actions.getAllGroupsData.Type, getAllGroupsData);
    yield takeEvery(Actions.getGroupsListsData.Type, getGroupsListsData);
    yield takeEvery(Actions.getGroupsStudentsData.Type, getGroupsStudentsData);
    yield takeEvery(Actions.getGroupsListSummary.Type, getGroupsListSummary);
    yield takeEvery(Actions.getStudentProgress.Type, getStudentProgress);
    yield takeEvery(Actions.logOut.Type, logOut);
    yield takeEvery(Actions.updateDeclaration.Type, updateDeclaration);
    yield takeEvery(Actions.applyComment.Type, applyComment);
    yield takeEvery(Actions.commentFromTile.Type, commentFromTile)
}