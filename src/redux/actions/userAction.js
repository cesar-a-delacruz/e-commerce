import {Api} from '../../utils/Api'
import { getUser } from '../../utils/localstorage'
import * as actionTypes from '../constants/userContants'

export const setUserDetails = () => async dispatch => {

  const user = getUser()
  if (!user) {
    return
  }
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...user},
    },
  })
}

export const setInitialState = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
    payload: {
      isLogin: false,
      details: {},
    },
  })
}
