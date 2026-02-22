import React from 'react'
import { BadgeCheck, Heart, Repeat2, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">

            {/* User Info */}
            <div className="inline-flex items-center gap-3 cursor-pointer">

                <img
                    src={post.user.profile_picture}
                    alt=""
                    className="w-10 h-10 rounded-full shadow"
                />

                <div>

                    <div className="flex items-center space-x-1">
                        <span>{post.user.full_name}</span>
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>

                    <div className='text-gray-500 text-sm'>
                        @{post.user.username} • {moment(post.createdAt).fromNow() }
                    </div>

                </div>

            </div>

            {/* Post Content */}
            {post.content && <p className='text-gray-800'>{post.content}</p>}

            {/* Post Images */}
            {post.image_urls?.length > 0 && (
                <img src={post.image_urls[0]} alt='post' className='w-full rounded-lg' />
            )}

            {/* Action Buttons */}
            <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                <button className='flex items-center gap-2 text-gray-600 hover:text-red-500 transition'>
                    <Heart className='w-5 h-5' />
                    <span className='text-sm'>{post.likes_count?.length || 0}</span>
                </button>
                <button className='flex items-center gap-2 text-gray-600 hover:text-green-500 transition'>
                    <Repeat2 className='w-5 h-5' />
                </button>
                <button className='group flex items-center gap-2 text-gray-600 hover:text-purple-600 transition'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 font-bold text-xs group-hover:scale-110'>
                        A
                    </div>
                </button>
                <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500 transition'>
                    <MessageCircle className='w-5 h-5' />
                </button>
                <button className='flex items-center gap-2 text-gray-600 hover:text-gray-800 transition'>
                    <Share2 className='w-5 h-5' />
                </button>
            </div>

        </div>
    )
}

export default PostCard
