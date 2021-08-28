import { call, put, takeLatest, all, } from "redux-saga/effects"

import { LOGIN_USER, REGISTER_USER } from "../actions"

import { loginUserSuccess, loginUserError, registerUserSuccess, registerUserError} from './actions'

import axios from 'axios'
import moment from 'moment'

import { setSessionInfo } from "../../storage"

/* LOGIN */

  const loginWithEmailPasswordAsync = async (email, password) =>
  await axios.post("http://localhost:5000/register/login", { email, password })
    .then((res) => res.data)
    .catch((error) => error.response.data);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      setSessionInfo({ name: 'user', val: loginUser.user });
      setSessionInfo({ name: 'token', val: 'Bearer '+ loginUser.token });
      yield put(loginUserSuccess(loginUser.user));
      /* history.push('/'); */
    } else {
      yield put(loginUserError(loginUser.message));
    }  
  } catch (error) {
     yield put(loginUserError(error));
  }
}

/* REGISTER */

const registerAsync = async (data) => {
  const month = moment().month(data.month).format("MM");
  return await axios.post("http://localhost:5000/register/create", { name: data.name, email: data.email, birth: data.day+"/"+month+"/"+data.year })
    .then((res) => res.data)
    .catch((error) => error.response.data);
}

function* register({ payload }) {
const data = payload;
try {
    const register =  yield call(registerAsync, data);
    if(!register.error) {
      yield all([yield put(registerUserSuccess(register)), yield put(registerUserError('')) ])
      
    } else yield put(registerUserError(register.error))

} catch (error) {
   yield put(registerUserError(error));
}
}


export default function* authSaga() {
  yield all ([
    takeLatest(LOGIN_USER, loginWithEmailPassword),
    takeLatest(REGISTER_USER, register)
  ])
}