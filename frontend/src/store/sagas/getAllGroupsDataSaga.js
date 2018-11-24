import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getAllGroupsData() {
    let { data } = yield call(axios.get, "http://localhost:8000/api/groups");
    yield put(Actions.setAllGroupsData(data));
}