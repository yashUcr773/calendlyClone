import { MeetingEventItemType } from '@/types'
import React from 'react'
import { Clock, Copy, MapPin, Pen, Settings, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { app } from '@/lib/firebase/config'


interface MeetingEventItemProps {
    event: MeetingEventItemType
    onEventDelete: () => void
}

const MeetingEventItem = ({ event, onEventDelete }: MeetingEventItemProps) => {


    const db = getFirestore(app)

    const copyLink = () => {
        navigator.clipboard.writeText(event.locationURL)
        toast.success('Copied')
    }

    const deleteEvent = async () => {
        try {
            const response = await deleteDoc(doc(db, 'MeetingEvent', event.id))
            toast.success('Meeting deleted!!!')
            onEventDelete()
        } catch (e) {
            console.log(e)
            toast.error('Some Error Occured!!!')
        }
    }

    return (
        <div className='shadow-md border-t-8 rounded-lg p-4 flex flex-col gap-4' style={{ borderColor: event?.themeColor }}>
            <div className='flex flex-row justify-end'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Settings className='cursor-pointer'></Settings>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='p-2'>
                        <DropdownMenuItem className='flex gap-4'><Pen size={20}></Pen>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { deleteEvent() }} className='flex gap-4'><Trash2 size={20}></Trash2> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h2 className='font-medium text-xl'>{event.eventName}</h2>
            <div className='flex flex-row justify-between'>
                <h2 className='flex gap-2 text-gray-500'><Clock></Clock> {event.duration} Mins</h2>
                <h2 className='flex gap-2 text-gray-500'><MapPin></MapPin> {event.location}</h2>
            </div>
            <hr></hr>
            <div className='flex flex-row justify-between'>
                <h2 onClick={() => { copyLink() }}
                    className='flex gap-2 text-sm items-center text-primary cursor-pointer'>
                    <Copy className='h-4 w-4'></Copy> Copy Link
                </h2>
                <Button className="border-primary rounded-full text-primary" variant={'outline'}>Share</Button>
            </div>
        </div>
    )
}

export default MeetingEventItem