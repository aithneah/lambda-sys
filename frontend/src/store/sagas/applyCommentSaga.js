import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import * as selectors from "./selectors";
import {push} from "connected-react-router";

export function* applyComment(action) {
    const student = yield select(selectors.student);
    yield call(axios.post, "http://localhost:8000/api/students/" + student.index + "/comment",
        {exerciseId: action.exerciseId, commentContent: action.commentContent, note: action.note});
    yield put(push("/home"));
}