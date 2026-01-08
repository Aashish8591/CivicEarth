import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    // <div className='min-h-screen flex flex-col md:flex-row'>
    <div className="relative min-h-screen flex">
      {/* Background Image */}
      <img src={assets.bg2} alt="background" className='absolute top-0 left-0 -z-10 w-full h-full object-cover' />



      {/* left side */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        <img src={assets.civicEarthlogo} alt="CivicEarth" className='h-16 md:h-20 object-contain' />
        {/* <div className="absolute inset-0 -z-10 bg-white/40 backdrop-blur-sm"></div> */}

        <div>
          <div className='flex items-center gap-3 mb-4 max-md:mt-10'>
            <img src={assets.group_users} alt="" className='h-8 md:h-10' />
            <div className='flex flex-col'>
              <div className='flex'>
                {
                  Array(5).fill(0).map((_, i) => (<Star key={i} className='size-4 md:size-5 text-transparent fill-amber-500' />))
                }
              </div>
              <p>Used by 7k Developers</p>
            </div>
          </div>
          {/* <h1 className='text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-[#4B2E2B] to-[#7A4A2E] bg-clip-text text-transparent'>Let’s help each other!</h1>
          <p className='text-xl md:text-3xl text-[#4B2E2B] max-w-72 md:max-w-md'>Connect with global community on CivicEarth</p> */}

          {/* IDEA 1 */}
          <h1 className="text-3xl md:text-6xl md:pb-2 font-bold text-[#2F2A25]">
            Let’s help each other!
          </h1>

          <p className="text-xl md:text-3xl text-[#5B5046] max-w-72 md:max-w-md">
            Connect with global community on CivicEarth
          </p>

          {/* IDEA 2 */}
          {/* <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-[#2E3A2F] to-[#6B8E23] bg-clip-text text-transparent">
            Let’s help each other!
          </h1>

          <p className="text-xl md:text-3xl text-[#2E3A2F] max-w-72 md:max-w-md">
            Connect with global community on CivicEarth
          </p> */}




        </div>
        <span className='md:h-10'></span>
      </div>

      {/* right side */}
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10'>
        <SignIn />
      </div>


    </div>
  )
}

export default Login