"use client"

import React, { useEffect, useState } from 'react'
import { app } from '@/lib/firebase/config'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'

import MeetingEventItem from './meeting-event-item'
import { BusinessInfo, MeetingEventItemType } from '@/types'


const MeetingEventList = () => {

    const { isLoading, user } = useKindeBrowserClient()
    const db = getFirestore(app)

    const [eventlist, setEventlist] = useState<MeetingEventItemType[]>([])
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>()

    const getUserEvents = async () => {

        if (!user?.email) return
        setEventlist([])
        const q = query(collection(db, 'MeetingEvent'), where('createdBy', '==', user?.email), orderBy('id', 'desc'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setEventlist((prev: any) => [...prev, doc.data()])
        })

    }

    const getBusiness = async () => {
        if (!user?.email) return
        const docRef = doc(db, 'Business', user?.email!)
        const response = await getDoc(docRef)
        setBusinessInfo(response.data() as BusinessInfo)
    }

    useEffect(() => {
        getUserEvents()
        getBusiness()
    }, [isLoading])

    if (isLoading) {
        return <div>Loading</div>
    }

    const onEventDelete = () => {
        getUserEvents()

    }

    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {eventlist.map(event => (
                <MeetingEventItem businessInfo={businessInfo!} key={event.id} event={event} onEventDelete={onEventDelete}></MeetingEventItem>
            ))}
        </div>
    )
}

export default MeetingEventList