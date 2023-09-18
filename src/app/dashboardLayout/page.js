import React from 'react'
import Sidebar from './common/sidebar'
import Dashboard from "../dashboardLayout/dashboard/page"

const page = ({children}) => {
  return (
    <div>
      <Sidebar/>
    </div>
   
  )
}

export default page