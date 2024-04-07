"use client"
import React, { useState } from 'react'
import MeetingForm from './_components/meeting-form'
import PreviewMeetingForm from './_components/preview-meeting-form'
import { MeetingFormData } from '@/types'

const CreateMeetingPage = () => {

    const [formValue, setFormValue] = useState<MeetingFormData | null>()

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div>
                    <MeetingForm setFormValue={setFormValue}></MeetingForm>
                </div>
                <div className='md:col-span-2'>
                    <PreviewMeetingForm formData={formValue!}></PreviewMeetingForm>
                </div>
            </div>
        </>
    )
}

export default CreateMeetingPage