import { MeetingFormData } from '@/types'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../dashboard/_components/dashboard-header'
import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface PreviewMeetingFormProps {
    formData: MeetingFormData
}

const PreviewMeetingForm = ({ formData }: PreviewMeetingFormProps) => {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [timeSlot, setTimeSlot] = useState("")

    useEffect(() => {
        formData?.duration && createTimeSlot(formData?.duration)
    }, [formData])

    const createTimeSlot = (interval: number) => {
        const startTime = 8 * 60; // 8 AM in minutes
        const endTime = 22 * 60; // 10 PM in minutes
        const totalSlots = (endTime - startTime) / interval;
        const slots = Array.from({ length: totalSlots }, (_, i) => {
            const totalMinutes = startTime + i * interval;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
            const period = hours >= 12 ? 'PM' : 'AM';
            return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
        });

        setTimeSlots(slots);
    }

    // TODO: Make responsive
    return (
        <>
            <DashboardHeader></DashboardHeader>
            <div className='p-4 py-8 shadow-lg m-8 border-t-8 rounded-md' style={{ borderColor: formData?.themeColor }}>
                <Image width={150} height={150} src={'/logo.svg'} alt='logo'></Image>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='flex flex-col gap-2 p-4 border-r'>
                        <div>Business</div>
                        <div className='font-bold text-2xl'>{formData?.eventName ? formData?.eventName : 'Meeting'}</div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-2'><Clock></Clock> {formData?.duration} Mins</div>
                            <div className='flex flex-row gap-2'><MapPin></MapPin> {formData?.location}</div>
                            <Link href={formData?.locationURL || ""} className='flex flex-row gap-2 text-primary'>{formData?.locationURL}</Link>
                        </div>
                    </div>

                    <div className='md:col-span-2 flex p-4'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold'>Select date and time</h2>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                                disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                                }
                            />
                        </div>
                        <ScrollArea className='overflow-auto w-full max-h-[400px]'>
                            <div className='flex flex-col w-full gap-4 p-4'>
                                {timeSlots.map((slot, index) => (
                                    <Button onClick={() => { setTimeSlot(slot) }} key={index} className={cn('border-primary text-primary hover:text-white hover:bg-primary', timeSlot === slot && 'text-white bg-primary')} variant={'outline'}>{slot}</Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PreviewMeetingForm