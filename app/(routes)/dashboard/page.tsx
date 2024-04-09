"use client"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Header from "@/components/header";
import { app } from "@/lib/firebase/config";
import { getFirestore } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

// TODO: make sure user should not be able to access this without business
export default function DashboardPage() {

    const db = getFirestore(app);
    const { isLoading, user } = useKindeBrowserClient()
    const router = useRouter()

    useEffect(() => {
        user && isBusinessRegistered()
    }, [isLoading])

    const isBusinessRegistered = async () => {
        const docSnap = await getDoc(doc(db, 'Business', user?.email!));
        if (docSnap.exists()) {
            console.log('Document data', docSnap.data())
        } else {
            console.log('No document')
            return router.push('/create-business')
        }

    }

    if (isLoading) {
        return <h2>Loading..</h2>
    }

    return redirect('/dashboard/meeting-type')

}