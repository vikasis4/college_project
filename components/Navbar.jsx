"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GeneralContext } from "@context/general";

function Navbar() {

    const general = React.useContext(GeneralContext);

    return (
        <div className="bg-[url('/images/bzck4.jpg')] bg-cover z-10 fixed top-0 left-0 right-0 py-5 drop-shadow-md flex justify-between place-items-center flex-row px-8">
            <Link href="/">
                <h1 className="text-align-center text-white text-4xl pb-2 font-bold ">NIT KKR -- PYQ + NOTES</h1>
            </Link>
            {
                general.profile.login ?

                    <Link href="/profile">
                        <Image src={'/images/login.png'} className="border-white border-2 rounded-full" height="60" width="60" />
                    </Link>
                    :
                    <Link href="/auth">
                        <Image src={'/images/user.png'} height="70" width="70" />
                    </Link>
            }
        </div>
    )
}

export default Navbar