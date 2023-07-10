'use client';

import React from 'react'
import { GeneralContext } from '@context/general';
import { Logout } from '@preFunctions/postVerify';
import { useRouter } from 'next/navigation';

function pages() {

  const general = React.useContext(GeneralContext);
  const router = useRouter();

  React.useEffect(()=>{
    if (!general.profile.login) {
      router.push('/')
    }
  },[general])

  return (
    <section className="mt-32 flex flex-col justify-center place-items-center">
      <h1 className="text-center text-bold text-gray-600 text-2xl">
        {general.profile.email}
      </h1>
      <h1 className="text-left text-bold text-black w-4/5 mt-12 text-3xl pl-4">
        Uploads :-
      </h1>
      <div className="bg-slate-500 h-52 rounded-sm mt-6 w-4/5 flex flex-col justify-center place-items-center shadow-sm">
        {
          general.profile.uploads.length > 0 ?
            ''
            :
            <h1 className="text-center text-semibold text-white text-xl">
              Empty - Nothing is uploaded yet
            </h1>
        }
      </div>
      <button onClick={()=>Logout(general)} className="w-4/5 bg-blue-600 mt-8 py-4 rounded-md text-white text-bold hover:bg-pink-600">LogOut</button>
    </section>
  )
}

export default pages