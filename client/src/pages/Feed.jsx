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
    < div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
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
        <div className='bg-white rounded-xl shadow p-4'>
          <h2 className='font-semibold text-lg mb-3'>Sponsored</h2>
          <img src={assets.sponsored_img} alt='sponsored' className='w-full rounded-lg mb-3' />
          <h3 className='font-semibold mb-1'>Boost Your Community Impact</h3>
          <p className='text-sm text-gray-600 mb-2'>Connect with local initiatives and make a difference in your area.</p>
          <a href='#' className='text-blue-600 text-sm hover:underline'>Learn More</a>
        </div>
        <div className='bg-white rounded-xl shadow p-4'>
          <h2 className='font-semibold text-lg'>Recent Messages</h2>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed