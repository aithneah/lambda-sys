import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getGroupsListsData(action) {
    let { data } = yield call(axios.get, "http://localhost:8000/api/groups/" + action.groupId + "/lists");
    yield put(Actions.setGroupsListsData(action.groupId, data));
}