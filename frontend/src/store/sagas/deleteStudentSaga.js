import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import Actions from "../actions";
import * as selectors from "./selectors";

export function* deleteStudent(action) {
    const groups = yield select(selectors.groups);
    yield call(axios.delete, "http://localhost:8000/api/students/" + action.studentIndex);

    yield put(Actions.deleteStudentFromStore(action.studentIndex,
        groups.find(group => (group.students &&
            group.students.find(student => student.index === action.studentIndex) !== undefined))
            .id));
}