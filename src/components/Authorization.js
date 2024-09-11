import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { getRefreshToken } from '../storages/storages'

const isAuthenticated = getRefreshToken() === null ? false : true

const Authorization = ({ redirectTo, children }) => {
  if (isAuthenticated) {
    return <>{children}</>
  } else {
    return <Navigate to={redirectTo} replace />
  }
}

Authorization.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.node,
}

export default Authorization
