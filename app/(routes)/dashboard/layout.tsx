import React from 'react'
import { SidebarNav } from './_components/sidebar-nav'
import DashboardHeader from './_components/dashboard-header'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function ({ children }: DashboardLayoutProps) {
    return (
        <div>
            <div className='hidden md:block w-64 bg-slate-50 h-screen fixed'>
                <SidebarNav></SidebarNav>
            </div>
            <div className='md:ml-64'>
                <DashboardHeader></DashboardHeader>
                {children}
            </div>
        </div>
    )
}
