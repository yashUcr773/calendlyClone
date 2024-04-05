"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const SidebarNav = () => {

    const path = usePathname()
    const [activePath, setActivePath] = useState(path)

    useEffect(() => {
        setActivePath(path)
    }, [path])


    const menu = [
        {
            id: 1,
            name: 'Meeting Type',
            path: '/dashboard/meeting-type',
            icon: <Briefcase></Briefcase>
        },
        {
            id: 2,
            name: 'Schedule Meeting',
            path: '/dashboard/schedule-meeting',
            icon: <Calendar></Calendar>
        },
        {
            id: 3,
            name: 'Availability',
            path: '/dashboard/availability',
            icon: <Clock></Clock>
        },
        {
            id: 4,
            name: 'Settings',
            path: '/dashboard/settings',
            icon: <Settings></Settings>
        }
    ]

    return (
        <div className='p-4 py-8'>
            <div className='flex flex-row items-center justify-center'>
                <Image src={'/logo.svg'} width={100} height={100} alt='logo'></Image>
            </div>
            <div>
                <Button className='flex flex-row gap-2 rounded-full mt-6 items-center justify-center w-full'>
                    <Plus></Plus>
                    Create
                </Button>
                <div className='mt-4 flex flex-col gap-2'>
                    {menu.map(item => (
                        <Link href={item.path} key={item.id}>
                            <Button variant={'ghost'}
                                className={cn('flex gap-2 justify-start w-full hover:bg-blue-100', activePath === item.path && 'text-primary bg-blue-100')}>
                                {item.icon} {item.name}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
