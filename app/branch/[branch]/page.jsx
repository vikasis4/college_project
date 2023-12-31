"use client"
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "@context/general";
import { useRouter } from 'next/navigation'

function page({ params }) {

    const general = useContext(GeneralContext);
    const [map, setMap] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (general.datas) {
            var subjectData = general.datas.filter(({ name }) => name === params.branch)

            var cards = subjectData[0].subjects.map(({ name, _id }) => {
                return (
                    <div className=" " key={name}>
                        <div onClick={() => {general.setSubject({name,_id}); router.push('/branch/' + params.branch + '/' + name)}} className="p-1 md:p-4 border-2 bg-[url('/images/back2.jpg')] bg-contain border-slate-300 m-2 flex flex-col justify-center place-items-center gap-9 rounded-md shadow-lg hover:cursor-pointer hover:translate-y-[-1rem] ease-in duration-100 transform-gpu">
                            <h1 className="font-extrabold text-xl md:text-3xl shadow-2xl text-white p-3 md:p-6 text-center">
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
        <section className="pt-32 bg-[url('/images/back.jpeg')] bg-contain bg-fixed h-full">
            <h1 className="px-6 pb-12 font-extrabold text-4xl text-gray-700 uppercase"> --- {params.branch}</h1>
            <div className=" flex flex-row flex-wrap justify-center place-items-center">
                {map}
            </div>
        </section>
    )
}

export default page