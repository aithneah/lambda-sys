import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import * as selectors from "./selectors";
import {push} from "connected-react-router";

export function* applyComment(action) {
    const student = yield select(selectors.student);
    const studentIndex = student.index;
    const groups = yield select(selectors.groups);
    const groupId = groups.find(group => (group.summary &&
        (group.summary.find(s => s.index === studentIndex) !== undefined))).id;
    const comment = yield select(selectors.comment);
    const list = comment.list + 1;

    yield call(axios.post, "http://localhost:8000/api/students/" + studentIndex + "/comment",
        {exerciseId: action.exerciseId, commentContent: action.commentContent, note: action.note});

    yield put(push("/groups/" + groupId +"/lists/" + list + "/summary"));
}