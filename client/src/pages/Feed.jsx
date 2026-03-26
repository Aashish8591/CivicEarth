import React, { useEffect, useState } from 'react'
import { dummyPostsData, assets } from '../assets/assets'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'




const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchFeeds = async () => {
    
    setFeeds(dummyPostsData)
  }

useEffect (() => {
  fetchFeeds()
  setLoading(false)
}, [])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories and post list */}
      <div>
        {/* <StoriesBar/> */}
        <div className='p-4 space-y-6'>
          {feeds.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    

      
      {/* Right Side Bar */}
      <div className='hidden xl:block w-80 space-y-4'>
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='font-semibold text-lg mb-3 text-[#212529]'>Sponsored</h2>
          <img src={assets.sponsored_img} alt='sponsored' className='w-full rounded-lg mb-3' />
          <h3 className='font-semibold mb-1 text-[#212529]'>Boost Your Community Impact</h3>
          <p className='text-sm text-[#6C757D] mb-2'>Connect with local initiatives and make a difference in your area.</p>
          <a href='#' className='text-[#1A4E8A] text-sm hover:underline font-medium'>Learn More</a>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='font-semibold text-lg text-[#212529]'>Recent Messages</h2>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed