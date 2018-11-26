import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getStudentProgress(action) {
    let { data } = yield call(axios.get, "http://localhost:8000/api/students/" + action.studentId);
    yield put(Actions.setStudentProgress(action.studentId, data));
}