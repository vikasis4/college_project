"use client";

import { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { GeneralContext } from "@context/general";

function Branch_card() {

    const [map, setMap] = useState(null);
    const router = useRouter();
    const general = useContext(GeneralContext);


    useEffect(() => {
        if (general.datas) {
            var cards = general.datas.map(({ name, subjects }) => {
                return (
                    <div key={name}>
                        <div onClick={() => router.push('/branch/' + name)} className=" p-4 border-2 border-slate-300 bg-slate-100 m-2 flex flex-col justify-center place-items-center gap-9 rounded-md shadow-lg hover:cursor-pointer hover:translate-y-[-1rem] ease-in duration-100 transform-gpu">
                            <Image alt="BIROS" className="rounded-md" src={`/images/${name}.jpg`} width={260} height={260} />
                            <h1 className="text-black font-extrabold text-4xl grad-text text-center">
                                {name}
                            </h1>
                        </div>
                    </div>
                )
            })
            setMap(cards)
        }
    }, [general.datas])

    return (
        <section className="text-amber-950 py-32 bg-[url('/images/back.jpeg')] bg-contain bg-fixed px-8 flex flex-row flex-wrap gap-8 justify-center">{map}</section>
    )
}

export default Branch_card