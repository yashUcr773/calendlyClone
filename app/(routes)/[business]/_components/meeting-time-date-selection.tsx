import { BusinessInfo, MeetingEventItemType } from '@/types'
import { CalendarCheck, Clock, Clock1, Clock3, MapPin, Timer, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { app } from '@/lib/firebase/config'
import { toast } from 'sonner'

interface MeetingTimeDateSelectionProps {
    eventInfo: MeetingEventItemType
    businessInfo: BusinessInfo
}

// TODO Seperate the components
// TODO Add react hook forms and zod
const MeetingTimeDateSelection = ({ eventInfo, businessInfo }: MeetingTimeDateSelectionProps) => {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [timeSlot, setTimeSlot] = useState("")
    const [enableSlots, setEnableSlots] = useState(false)
    const [page, setPage] = useState(1)
    const [prevBookings, setPrevBookings] = useState<any[]>([])

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [notes, setNotes] = useState("")



    const db = getFirestore(app)

    useEffect(() => {
        eventInfo?.duration && createTimeSlot(eventInfo?.duration)
    }, [eventInfo])

    useEffect(() => {
        date && handleDateSelect(date)
    }, [businessInfo])

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

    const handleDateSelect = async (date: Date) => {
        setDate(date)


        const day = format(date, 'EEEE')
        if (businessInfo?.daysAvailable?.[day]) {
            await getPrevBookings(date)
            setEnableSlots(true)
        } else {
            setEnableSlots(false)
        }
    }

    const setSelectedTime = (slot: string) => {
        setTimeSlot(slot)
    }

    const handleScheduleEvent = async () => {
        if (!email || !username) {
            toast.info('Username and Email are required')
            return
        }

        const uuid = Date.now()
        try {

            const response = await setDoc(doc(db, 'ScheduleMeetings', "" + uuid), {
                businessName: businessInfo.businessName,
                businessEmail: businessInfo.email,
                selectedTime: timeSlot,
                selectedDate: date,
                duration: eventInfo.duration,
                locationUrl: eventInfo.locationURL,
                eventId: eventInfo.id,
                id: uuid,
                username,
                email,
                notes,
            })

            toast.success('Meeting Scheduled!')
        } catch (e) {
            console.log(e)
            toast.error('Some error occured!')

        }


    }

    const getPrevBookings = async (date: Date) => {
        setPrevBookings([])
        const q = query(collection(db, 'ScheduleMeetings'), where('selectedDate', '==', date), where('eventId', '==', eventInfo.id))
        const querySnap = await getDocs(q)

        querySnap.forEach(snap => { setPrevBookings((prev: any) => [...prev, snap.data()]) })
    }

    const checkTimeSlot = (time: string) => {
        return (prevBookings.filter(prevBooking => prevBooking.selectedTime === time)).length > 0
    }

    // TODO: Copied from preview meeting. Make it a common component.
    // TODO: Make responsive
    return (
        <>
            <div className='p-4 py-8 shadow-lg my-10 border-t-8 rounded-md mx-12 md:mx-26 lg:mx-56' style={{ borderColor: eventInfo?.themeColor }}>
                <Image width={150} height={150} src={'/logo.svg'} alt='logo'></Image>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='flex flex-col gap-2 p-4 border-none md:border-r'>
                        <div>{businessInfo?.businessName}</div>
                        <div className='font-bold text-2xl'>{eventInfo?.eventName ? eventInfo?.eventName : 'Meeting'}</div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-2'><Clock></Clock> {eventInfo?.duration} Mins</div>
                            <div className='flex flex-row gap-2'><MapPin></MapPin> {eventInfo?.location}</div>
                            <div className='flex flex-row gap-2'><CalendarCheck></CalendarCheck> {format(date!, 'PPP')}</div>
                            {timeSlot && (<div className='flex flex-row gap-2'><Clock3></Clock3> {timeSlot}</div>)}
                            <Link href={eventInfo?.locationURL || ""} className='flex flex-row gap-2 text-primary'>{eventInfo?.locationURL}</Link>
                        </div>
                    </div>

                    {page === 1 && (

                        <div className='md:col-span-2 flex p-4'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold'>Select date and time</h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(date) => { handleDateSelect(date!) }}
                                    className="rounded-md border"
                                    disabled={(date) =>
                                        date < new Date(new Date().setDate(new Date().getDate() - 1))
                                    }
                                />
                            </div>
                            <ScrollArea className='overflow-auto w-full max-h-[400px]'>
                                <div className='flex flex-col w-full gap-4 p-4'>
                                    {timeSlots.map((slot, index) => (
                                        <Button
                                            disabled={!enableSlots || checkTimeSlot(slot)}
                                            onClick={() => { setSelectedTime(slot) }} key={index} className={cn('border-primary text-primary hover:text-white hover:bg-primary', timeSlot === slot && 'text-white bg-primary')} variant={'outline'}>{slot}</Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                    )}
                    {page === 2 && (
                        <div className='p-4 px-8 flex flex-col gap-8'>
                            <h2 className='font-bold text-xl'>Enter Details</h2>
                            <div className=''>
                                <label>Name</label>
                                <Input placeholder='Enter your name' value={username} onChange={(e) => { setUsername(e.target.value) }}></Input>
                            </div>
                            <div className=''>
                                <label>Email</label>
                                <Input placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                            </div>
                            <div className=''>
                                <label>Notes (optional)</label>
                                <Input placeholder='What is this about?' value={notes} onChange={(e) => { setNotes(e.target.value) }}></Input>
                            </div>

                            <h2 className='text-xs text-gray-400'>By proceding, you are confirming to our terms and conditions.</h2>
                        </div>
                    )}
                </div>
                <div className='flex items-center justify-end mt-4 gap-4'>
                    {page === 2 && (<Button variant={'ghost'}
                        onClick={() => { setPage(page => page - 1) }}>
                        Back
                    </Button>)}
                    {page === 1 && (<Button
                        disabled={!date || !timeSlot}
                        onClick={() => { setPage(page => page + 1) }}>
                        Next
                    </Button>)}
                    {page === 2 && (<Button
                        disabled={!username || !email}
                        onClick={() => { handleScheduleEvent() }}>
                        Schedule
                    </Button>)}
                </div>
            </div>
        </>
    )
}

export default MeetingTimeDateSelection