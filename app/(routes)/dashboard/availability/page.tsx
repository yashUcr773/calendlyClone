"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { app } from '@/lib/firebase/config'
import daysList from '@/utils/days-list'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

// TODO: Add checks that end time is greater than start time.
const AvailabilityPage = () => {

    const [days, setDays] = useState<Record<string, boolean>>()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const { isLoading, user } = useKindeBrowserClient()

    const db = getFirestore(app)

    const onCheckedChange = (day: string, value: boolean) => {
        setDays((prev) => ({ ...prev, [day]: value }))
    }

    const handleSave = async () => {

        try {
            const response = await updateDoc(doc(db, 'Business', user?.email!), {
                daysAvailable: days,
                startTime, endTime
            })
            toast.success('Availability Updated!!!')
        } catch (e) {

            toast.success('Some error occured!!!')
        }

    }

    useEffect(() => {
        user && getBusinessInfo()
    }, [isLoading])

    const getBusinessInfo = async () => {
        const response = await getDoc(doc(db, 'Business', user?.email!))
        const result = response.data()
        setDays(result?.daysAvailable)
        setStartTime(result?.startTime)
        setEndTime(result?.endTime)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-10 flex flex-col gap-8'>
            <h2 className='font-bold text-2xl'>Availability</h2>
            <hr></hr>
            <div>
                <h2 className='font-bold my-4'>Availability Days</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {daysList.map((day: any, index) => (
                        <div key={index} className='flex gap-2 items-center justify-start'>
                            <Checkbox checked={days?.[day]} onCheckedChange={(e) => { onCheckedChange(day, !!e) }}></Checkbox>{day}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='font-bold my-4'>Availability Time</h2>
                <div className='flex gap-8'>
                    <div>
                        <h2>Start Time</h2>
                        <Input type='time' value={startTime} onChange={(e) => { setStartTime(e.target.value) }}></Input>
                    </div>
                    <div>
                        <h2>End Time</h2>
                        <Input type='time' value={endTime} onChange={(e) => { setEndTime(e.target.value) }}></Input>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-center'>
                <Button onClick={() => { handleSave() }} className='px-6 py-4'>Save</Button>
            </div>

        </div>
    )
}

export default AvailabilityPage