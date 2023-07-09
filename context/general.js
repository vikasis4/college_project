'use client';

import React from 'react';
import { createContext, useState, useEffect } from "react";

export const GeneralContext = createContext({})

export const GeneralProvider = ({ children }) => {

    const [datas, setDatas] = useState(null);
    const [mode, setMode] = useState('user');

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
        <GeneralContext.Provider value={{ datas, setDatas, mode, setMode }}>
            {children}
        </GeneralContext.Provider>
    )
} 