import React, { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PROFILE: 'UPDATE_PROFILE'
}

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      }
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case AUTH_ACTIONS.CLEAR_ERROR:
        return {
          ...state,
          error: null
        }
    case AUTH_ACTIONS.UPDATE_PROFILE:
        return {
          ...state,
          user: { ...state.user, ...action.payload }
        }
    default:
      return state
  }
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken')
        const userInfoString = localStorage.getItem('userInfo')

        if (token && userInfoString) {
          const userInfo = JSON.parse(userInfoString)
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: userInfo
          })
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        }
      } catch (error) {
        console.error('Failed to parse auth data from localStorage', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    }

    checkAuthStatus()
  }, [])

  const login = (userInfo, token) => {
    if (userInfo && typeof userInfo === 'object' && token) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: userInfo
      })
    } else {
      console.error('Login function received invalid data:', { userInfo, token })
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: 'Dữ liệu người dùng hoặc token không hợp lệ.'
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  const updateProfile = (profileData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_PROFILE,
      payload: profileData
    })
    const updatedUser = { ...state.user, ...profileData }
    localStorage.setItem('userInfo', JSON.stringify(updatedUser))
  }

  const isLandlord = () => {
    return state.user?.role === 'HOST'
  }

  const isAdmin = () => {
    return state.user?.role === 'ADMIN'
  }

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    isLandlord,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}