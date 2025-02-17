import React, { Children, useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAdmin({children}) {
    const {isAdmin} = useContext(AdminContext)
    return isAdmin ? children : <Navigate to='/login'/>
}
