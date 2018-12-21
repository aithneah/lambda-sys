import axios from "axios";
import {put, call} from "redux-saga/effects";
import Actions from "../actions";
import {push} from 'connected-react-router'


export function* getAccountData(action) {
    let {data: account} = yield call(axios.get, "http://localhost:8000/api/accounts/" + action.index);
    yield put(Actions.setAccountData(account.index, account.name, account.course));
    yield put(push("/home"));
}