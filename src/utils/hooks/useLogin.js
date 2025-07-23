import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {Api} from '../Api'
import {logout, getUser} from '../localstorage'

function useLogin() {
  const [loginInfo, setLoginInfo] = useState({
    loading: true,
    isLogin: false,
  })
  const {replace} = useHistory()
  const checkLogin = useCallback(async () => {
    const user = getUser()
    if (!user) {
      replace('/')
      logout()
      return
    }
    setLoginInfo({loading: false, isLogin: true})
  }, [replace])
  useEffect(() => {
    checkLogin()
  }, [checkLogin])
  return {loginInfo}
}

export default useLogin
