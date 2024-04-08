import { Input } from '@/components/ui/input'

import React, { useEffect } from 'react'
import MeetingEventList from './_components/meeting-event-list'

const MeetingTypePage = () => {
    return (
        <div className='p-4'>
            <div className='flex flex-col gap-4'>
                <h1 className='font-bold text-3xl'>Meeting Event Type</h1>
                <Input placeholder='Search' className='max-w-xs'></Input>
                <hr></hr>
                <MeetingEventList></MeetingEventList>
            </div>
        </div>
    )
}

export default MeetingTypePage