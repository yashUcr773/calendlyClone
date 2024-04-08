"use client"

import React, { useEffect, useState } from 'react'
import { app } from '@/lib/firebase/config'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'

import MeetingEventItem from './meeting-event-item'
const MeetingEventList = () => {

    const { isLoading, user } = useKindeBrowserClient()
    const db = getFirestore(app)

    const [eventlist, setEventlist] = useState<any[]>([])

    const getUserEvents = async () => {

        if (!user?.email) return
        setEventlist([])
        const q = query(collection(db, 'MeetingEvent'), where('createdBy', '==', user?.email), orderBy('id', 'desc'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setEventlist((prev: any) => [...prev, doc.data()])
        })

    }

    useEffect(() => {
        getUserEvents()
    }, [isLoading])

    if (isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {eventlist.map(event => (
                <MeetingEventItem event={event}></MeetingEventItem>
            ))}
        </div>
    )
}

export default MeetingEventList