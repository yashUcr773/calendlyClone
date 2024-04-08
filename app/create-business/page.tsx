"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import Image from "next/image"
import { useState } from "react"
import { app } from '@/lib/firebase/config'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const CreateBusinessPage = () => {


    const { user } = useKindeBrowserClient()
    const [business, setBusiness] = useState("")
    const db = getFirestore(app);
    const router = useRouter()

    const onCreateBusiness = async () => {
        const response = await setDoc(doc(db, 'Business', user?.email!), {
            businessName: business,
            email: user?.email,
            userName: `${user?.given_name} ${user?.family_name}`
        })
        console.log(response)
        setBusiness("")
        toast.success('New business created!!!')
        router.replace('/dashboard')
    }

    return (
        <div className="p-14 items-center flex flex-col gap-20 my-10">
            <Image src="/logo.svg" width={200} height={200} alt="logo"></Image>
            <div className="flex flex-col items-center gap-4 max-w-3xl">
                <h2 className="text-4xl font-bold">What should we call your business?</h2>
                <p className="text-slate-500">You can always change this later from settings.</p>
                <div className="w-full">
                    <label className="text-slate-400">Team Name:</label>
                    <Input
                        onChange={(e) => { setBusiness(e.target.value) }}
                        value={business}
                        className="mt-2"
                        placeholder="Ex. My awesome team"></Input>
                </div>
                <Button onClick={onCreateBusiness} className="w-full" disabled={!business}>Create Business</Button>
            </div>
        </div>
    )
}

export default CreateBusinessPage