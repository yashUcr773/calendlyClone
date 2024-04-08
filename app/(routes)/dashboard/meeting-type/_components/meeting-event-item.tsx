import { MeetingEventItemType } from '@/types'
import React from 'react'
import { Clock, Copy, MapPin, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface MeetingEventItemProps {
    event: MeetingEventItemType
}

const MeetingEventItem = ({ event }: MeetingEventItemProps) => {

    const copyLink = () => {
        navigator.clipboard.writeText(event.locationURL)
        toast.success('Copied')
    }

    return (
        <div className='shadow-md border-t-8 rounded-lg p-4 flex flex-col gap-4' style={{ borderColor: event?.themeColor }}>
            <div className='flex flex-row justify-end'>
                <Settings className='cursor-pointer'></Settings>
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