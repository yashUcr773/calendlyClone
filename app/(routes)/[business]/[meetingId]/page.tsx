"use client"
import React, { useEffect, useState } from 'react'
import MeetingTimeDateSelection from '../_components/meeting-time-date-selection'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/lib/firebase/config'
import { BusinessInfo, MeetingEventItemType } from '@/types'

interface MeetingIdPageProps {
    params: {
        business: string,
        meetingId: string
    }
}

const MeetingIdPage = ({ params }: MeetingIdPageProps) => {

    const db = getFirestore(app)
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>()
    const [eventInfo, setEventInfo] = useState<MeetingEventItemType>()
    const [loader, setLoader] = useState(true)

    const getData = async () => {
        setLoader(true)
        const q = query(collection(db, 'Business'), where('businessName', '==', decodeURI(params.business)))
        const docSnap = await getDocs(q)
        docSnap.forEach(doc => { setBusinessInfo(doc.data() as BusinessInfo) })

        const res = await getDoc(doc(db, 'MeetingEvent', decodeURI(params.meetingId)))
        setEventInfo(res.data() as MeetingEventItemType)
        setLoader(false)
    }

    useEffect(() => {
        params && getData()
    }, [params])


    if(loader) {
        return <div>Loading</div>
    }


    return (
        <div>
            <MeetingTimeDateSelection businessInfo={businessInfo!} eventInfo={eventInfo!}></MeetingTimeDateSelection>
        </div>
    )
}

export default MeetingIdPage