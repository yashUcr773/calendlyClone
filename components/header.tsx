"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
export default function Header() {

    const { isAuthenticated } = useKindeBrowserClient()

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-4 shadow-md">
                <Image src="/logo.svg" width={100} height={100} alt='logo' className="w-36 md:w-52"></Image>
                <ul className="hidden md:flex flex-row gap-x-6 font-medium text-lg">
                    <li className="hover:text-primary transition-all duration-300 cursor-pointer">Product</li>
                    <li className="hover:text-primary transition-all duration-300 cursor-pointer">Pricing</li>
                    <li className="hover:text-primary transition-all duration-300 cursor-pointer">Contact us</li>
                    <li className="hover:text-primary transition-all duration-300 cursor-pointer">About us</li>
                </ul>
                <div className="flex flex-row gap-x-5">
                    {!isAuthenticated && (
                        <>
                            <LoginLink>
                                <Button variant={'ghost'}>Login</Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button>Get Started</Button>
                            </RegisterLink>
                        </>
                    )}

                    {isAuthenticated && (
                        <LogoutLink><Button>Logout</Button></LogoutLink>
                    )}
                </div>
            </div>
        </div>
    )
}