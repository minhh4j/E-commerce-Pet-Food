import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

function AdminPage() {
    return (
      <div className="flex h-screen">
        <div className='w-1/4 bg-black'>
        <SideBar /> 
        </div>
      
        <div className="flex-1 p-6 overflow-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    );
  }
  

export default AdminPage