import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";


export function* getGroupsListSummary(action) {
    let { data } = yield call(axios.get,
        "http://localhost:8000/api/groups/"
        + action.groupId + "/lists/" + action.listId + "/summary");
    yield put(Actions.setGroupsListSummary(action.groupId, data));
}