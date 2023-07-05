'use client';

import { createContext, useState, useEffect } from "react";

export const GeneralContext = createContext({})

export const GeneralProvider = ({ children }) => {

    const [datas, setDatas] = useState(null);
    useEffect(() => {
        const fetch_data = async () => {
            const response = await fetch("http://localhost:3000/api/batch", {
                method: "GET",
            });
            const data = (await response.json()).data;
            setDatas(data);
        }
        fetch_data()
    }, [])

    return (
        <GeneralContext.Provider value={{ datas, setDatas }}>
            {children}
        </GeneralContext.Provider>
    )
};