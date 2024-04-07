"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { app } from '@/lib/firebase/config'
import { cn } from '@/lib/utils'
import { MeetingFormData } from '@/types'
import locationOptions from '@/utils/location-options'
import themeOptions from '@/utils/theme-options'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


interface MeetingFormProps {
    setFormValue: ({ }: MeetingFormData) => void
}

const MeetingForm = ({ setFormValue }: MeetingFormProps) => {

    const [location, setLocation] = useState("")
    const [locationURL, setLocationURL] = useState("")
    const [themeColor, setThemeColor] = useState(themeOptions[0])
    const [eventName, setEventName] = useState("")
    const [duration, setDuration] = useState(30)

    const { user } = useKindeBrowserClient()
    const router = useRouter()

    useEffect(() => {
        setFormValue({
            location, locationURL, themeColor, eventName, duration
        })
    }, [location, locationURL, themeColor, eventName, duration])

    const db = getFirestore(app)
    const createEvent = async () => {
        const uuid = Date.now().toString()
        console.log(uuid)
        try {

            const response = await setDoc(doc(db, 'MeetingEvent', uuid), {
                id: uuid,
                eventName, duration, location, locationURL, themeColor,
                businessid: doc(db, 'Business', user?.email!),
                createdBy: user?.email
            })

            console.log(response)
            router.push('/dashboard/meeting-type')
            toast('New meeting created!!!')
        } catch (e) {
            console.log(e)
            toast('Some error occured!!!')
        }

    }

    return (
        <div className='p-8 shadow-md border h-screen'>
            <Link href={'/dashboard'}>
                <h2 className='flex gap-2'>
                    <ChevronLeft></ChevronLeft>
                    Cancel
                </h2>
            </Link>
            <div className='mt-4'>
                <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
                <hr></hr>
            </div>
            <div className='flex flex-col gap-4 my-4'>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm'>Event Name*</label>
                    <Input placeholder='What is your meeting called?' onChange={(e) => { setEventName(e.target.value) }}></Input>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm'>Duration*</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'} className='max-w-40'>{duration} Mins</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => { setDuration(15) }}>15 Mins</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setDuration(30) }}>30 Mins</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setDuration(45) }}>45 Mins</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setDuration(60) }}>60 Mins</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm'>Location*</label>
                    <div className='flex flex-row flex-wrap gap-2'>
                        {locationOptions.map(option => (
                            <div key={option.name} onClick={() => { setLocation(option.name) }}
                                className={cn('border flex-1 flex flex-col justify-center items-center p-3 cursor-pointer rounded-lg hover:bg-blue-100 hover:border-primary', location === option.name && "bg-blue-100 border-primary")}>
                                <Image src={option.icon} alt={option.name} height={32} width={32}></Image>
                                <span>{option.name}</span>
                            </div>
                        ))}
                    </div>
                    {location && (
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm'>Add {location} URL</label>
                            <Input placeholder='Add url' onChange={(e) => { setLocationURL(e.target.value) }}></Input>
                        </div>
                    )}

                </div>
                <div className='flex flex-col gap-y-3'>
                    <label className='text-sm'>Select Theme Color</label>
                    <div className=' flex justify-evenly cursor-pointer'>
                        {themeOptions.map((color, index) => (
                            <div
                                onClick={() => { setThemeColor(color) }}
                                key={index}
                                className={cn('h-6 w-6 rounded-full border-4 border-transparent box-content', themeColor === color && "border-black")}
                                style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row items-center justify-end gap-4 mt-8'>
                    <Link href={'/dashboard'}>
                        <Button variant={'outline'} className='px-4 py-2'>Cancel</Button>
                    </Link>
                    <Button className='px-4 py-2' disabled={!eventName || !duration || !location || !locationURL} onClick={createEvent}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default MeetingForm