'use client';
import React from 'react'
import { API_AUTH } from '@utils/apis'
import { useRouter } from 'next/navigation';
import { Post_Verify } from '@preFunctions/postVerify';
import { GeneralContext } from '@context/general';

function page() {

    const router = useRouter();
    const general = React.useContext(GeneralContext);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [state, setState] = React.useState(true);
    const [loading, setLoading] = React.useState({l1:false, l2:false})

    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading({l1:true, l2:false})
        var response = await fetch(API_AUTH, {
            method: 'POST',
            body: JSON.stringify({ action: "auth", otp: 0, email, name })
        })
        var result = await response.json();
        if (result.status) {
            setState(false)
        } else {
            alert('Something went wrong')
        }
    }
    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading({l1:true, l2:true})
        var response = await fetch(API_AUTH, {
            method: 'POST',
            body: JSON.stringify({ action: "verifyOtp", otp, email })
        })
        var result = await response.json();
        if (result.status === 'true') {
            localStorage.setItem('token', result.token);
            router.push('/')
            Post_Verify(general);
        } else if (result.status === 'galat') {
            setLoading({l1:true, l2:false})
            alert('Wrong OTP')
        } else {
            setLoading({l1:true, l2:false})
            alert('Something went wronged')
        }
    }

    return (
        <div className='mt-28 flex flex-col justify-center place-items-center'>
            <h1 className='text-center font-semibold text-2xl pt-12 mb-12'>Login / Sign Up</h1>

            {
                state ?
                    <>
                        <input value={name} onChange={(e) => {loading.l1 ? null : setName(e.target.value) }} placeholder='Enter your Name' className='bg-slate-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 mb-6' />
                        <input value={email} onChange={(e) => {loading.l1 ? null : setEmail(e.target.value) }} placeholder='Enter your email address' className='bg-slate-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 mb-6' />
                        <button onClick={(e) => sendOtp(e)} className='bg-blue-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 hover:cursor-pointer'>{loading.l1 ? 'Loading...':'Continue'}</button>
                    </>
                    :
                    <>
                        <input value={otp} onChange={(e) => {loading.l2 ? null : setOtp(e.target.value) }} placeholder='Enter 6 Digits OTP' className='bg-slate-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 mb-6' />
                        <button onClick={(e) => verifyOtp(e)} className='bg-blue-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 hover:cursor-pointer'>{loading.l2 ? 'Loading...':'Continue'}</button>
                    </>
            }
        </div>
    )
}

export default page