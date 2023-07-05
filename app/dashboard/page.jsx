"use client";

import React from "react"

function page() {

    const [branchName, setBranchName] = React.useState('');
    const [password, setPassword] = React.useState('');

  return (
    <div className="pt-32">
        <h1 className="text-center font-extrabold text-gray-500 text-4xl">Dashboard Login</h1>
        <div className="pt-24 flex flex-col justify-center place-items-center gap-8">
            <input value={branchName} onChange={(e)=> setBranchName(e.target.value)} placeholder="Enter Branch name" className="w-1/2 outline-none bg-gray-500 rounded-md text-gray-200 placeholder-gray-200 placeholder-opacity-100 shadow-lg p-4" />
            <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" className="w-1/2 outline-none bg-gray-500 rounded-md text-gray-200 placeholder-gray-200 placeholder-opacity-100 shadow-lg p-4" />
            <button className="w-1/2 outline-none bg-blue-400 rounded-md text-white font-bold text-2xl transition-all-100 hover:bg-fuchsia-400 duration-300  shadow-lg p-4">Submit</button>
        </div>
    </div>
  )
}

export default page