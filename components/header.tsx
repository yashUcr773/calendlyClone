import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
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
                    <Button variant={'ghost'}>Login</Button>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    )
}