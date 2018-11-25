import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getGroupsStudentsData(action) {
    let { data } = yield call(axios.get, "http://localhost:8000/api/groups/" + action.groupId + "/students");
    yield put(Actions.setGroupsStudentsData(action.groupId, data));
}