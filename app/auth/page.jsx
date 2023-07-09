'use client';
import React from 'react'
import { API_AUTH } from '@utils/apis'

function page() {

    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [state, setState] = React.useState(true);

    React.useEffect(() => {
        console.log(state);
    }, [state])

    const sendOtp = async (e) => {
        e.preventDefault();
        var response = await fetch(API_AUTH, {
            method: 'POST',
            body: JSON.stringify({ action: "auth", otp: 0, email })
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
        var response = await fetch(API_AUTH, {
            method: 'POST',
            body: JSON.stringify({ action: "verifyOtp", otp, email })
        })
        var result = await response.json();
        if (result.status === 'true') {
            alert('Login Successful')
        } else if (result.status === 'galat') {
            alert('Galat OTP')
        } else {
            alert('Something went wronged')
        }
    }

    return (
        <div className='mt-28 flex flex-col justify-center place-items-center'>
            <h1 className='text-center font-semibold text-2xl pt-12 mb-12'>Login / Sign Up</h1>

            {
                state ?
                    <>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email address' className='bg-slate-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 mb-6' />
                        <button onClick={(e) => sendOtp(e)} className='bg-blue-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 hover:cursor-pointer'>Continue</button>
                    </>
                    :
                    <>
                        <input value={otp} onChange={(e) => { setOtp(e.target.value) }} placeholder='Enter 6 Digits OTP' className='bg-slate-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 mb-6' />
                        <button onClick={(e) => verifyOtp(e)} className='bg-blue-500 outline-none text-white placeholder-white rounded-sm px-4 py-2 w-1/3 hover:cursor-pointer'>Continue</button>
                    </>
            }
        </div>
    )
}

export default page