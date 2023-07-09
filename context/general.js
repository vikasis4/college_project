'use client';

import React from 'react';
import { createContext, useState } from "react";

export const GeneralContext = createContext({})

export const GeneralProvider = ({ children }) => {

    const [datas, setDatas] = useState(null);
    const [profile, setProfile] = useState({
        email:'',
        comments:[],
        uploads:[],
        login:false
    });


    return (
        <GeneralContext.Provider value={{ datas, setDatas, profile, setProfile}}>
            {children}
        </GeneralContext.Provider>
    )
} 