"use client"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Header from "@/components/header";
import { app } from "@/lib/firebase/config";
import { getFirestore } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

    const db = getFirestore(app);
    const { user } = useKindeBrowserClient()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        user && isBusinessRegistered()
    }, [user])

    const isBusinessRegistered = async () => {

        setLoading(true)
        const docSnap = await getDoc(doc(db, 'Business', user?.email!));
        setLoading(false)
        if (docSnap.exists()) {
            console.log('Document data', docSnap.data())
        } else {
            console.log('No document')
            return router.replace('/create-business')
        }

    }

    if (loading) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <div>dasboard page</div>
        </>
    )
}