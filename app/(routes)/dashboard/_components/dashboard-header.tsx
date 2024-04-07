"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {

    const { user } = useKindeBrowserClient()


    return (
        <div className='shadow p-4 flex flex-row items-center justify-end'>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex flex-row gap-1 items-center justify-center cursor-pointer'>
                        <Image width={40} height={40} src={user?.picture || '/placeholder.jpg'} alt='Avatar' className='rounded-full'></Image>
                        <ChevronDown></ChevronDown>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem><LogoutLink>Logout</LogoutLink></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DashboardHeader