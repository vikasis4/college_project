'use client';

import React from 'react';
import { createContext, useState } from "react";

export const GeneralContext = createContext({})

export const GeneralProvider = ({ children }) => {

    const [datas, setDatas] = useState(null);
    const [subject, setSubject] = useState(null)
    const [profile, setProfile] = useState({
        name:'',
        email:'',
        comments:[],
        uploads:[],
        login:false
    });


    return (
        <GeneralContext.Provider value={{ datas, setDatas, profile, setProfile, subject, setSubject}}>
            {children}
        </GeneralContext.Provider>
    )
} 