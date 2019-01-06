import { put, call, select } from "redux-saga/effects";
import * as selectors from "./selectors";
import {push} from "connected-react-router";
import Actions from "../actions";
import axios from "axios";

export function* commentFromTile(action) {
    let { data } = yield call(axios.get, "http://localhost:8000/api/students/" + action.studentIndex);
    yield put(Actions.setStudentProgress(action.studentIndex, data));

    const student = yield select(selectors.student);
    console.log(student);
    const listIndex = student.declarationStructure
        .structure.findIndex(list => list.name === action.listName);

    const exerciseIndex = student.declarationStructure
        .structure.find(list => list.name === action.listName)
        .children.findIndex(exercise => exercise.name === action.exerciseName);
    console.log(listIndex, exerciseIndex);

    yield put(Actions.setCommentData(listIndex, exerciseIndex));
    yield put(push("/students/" + action.studentIndex + "/commentOptions"));
}