import Link from "next/link";
import { Button } from "./ui/button";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center my-32 p-4">
            <div className="text-center mx-auto md:max-w-2xl lg:max-w-3xl">
                <h1 className="font-bold text-5xl lg:text-6xl text-slate-700">Easy scheduling ahead</h1>
                <h2 className="text-xl mt-6 text-slate-500 tracking-wide">Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.</h2>
                <div className="flex flex-col mt-6 gap-y-4 ">
                    <h3 className="text-sm">Signup free with Google or Microsoft.</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2">
                        <Button className="flex flex-row gap-x-4 px-3 py-7 text-lg w-full"><FaGoogle size={28} />Signup with Google</Button>
                        <Button className="flex flex-row gap-x-4 px-3 py-7 text-lg w-full"><FaMicrosoft size={28} />Signup with Microsoft</Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className=" bg-white px-4 mr-4">OR</span>
                        </div>
                    </div>
                    <h2 className="text-sm flex items-center justify-center flex-row gap-x-1">
                        <Link href={""} className="text-primary">
                            Sign up free with Email.
                        </Link>
                        No credit card required.
                    </h2>
                </div>
            </div>
        </div>
    )
}