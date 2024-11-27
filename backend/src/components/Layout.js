import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="hold-translation sidebar-mini layout-fixed">
        <Navbar/>
        <Sidebar/>
        <section className='content-wrapper h-auto'>
            <div className="container-fluid">
                <Outlet/>
            </div>
        </section>
    </div>
  )
}
