import React, { useState } from 'react'
import { BadgeCheck, Heart, Repeat2, MessageCircle, Share2, Send } from 'lucide-react'
import moment from 'moment'

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false)
    const [showAuthority, setShowAuthority] = useState(false)
    const [comment, setComment] = useState('')
    const [authorityComment, setAuthorityComment] = useState('')
    const [comments, setComments] = useState([])
    const [authorityResponses, setAuthorityResponses] = useState([])
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4 w-full max-w-2xl">

            {/* User Info */}
            <div className="inline-flex items-center gap-3 cursor-pointer">

                <img
                    src={post.user.profile_picture}
                    alt=""
                    className="w-10 h-10 rounded-full shadow"
                />

                <div>

                    <div className="flex items-center space-x-1">
                        <span className="text-[#212529] font-medium">{post.user.full_name}</span>
                        <BadgeCheck className="w-4 h-4 text-[#1A4E8A]" />
                    </div>

                    <div className='text-[#6C757D] text-sm'>
                        @{post.user.username} • {moment(post.createdAt).fromNow() }
                    </div>

                </div>

            </div>

            {/* Post Content */}
            {post.content && <p className='text-[#212529]'>{post.content}</p>}

            {/* Post Images */}
            {post.image_urls?.length > 0 && (
                <img src={post.image_urls[0]} alt='post' className='w-full rounded-lg' />
            )}

            {/* Action Buttons */}
            <div className='flex items-center justify-between pt-3 mt-3 border-t border-gray-200'>
                <button className='flex items-center gap-2 text-[#6C757D] hover:text-[#DC3545] transition'>
                    <Heart className='w-5 h-5' />
                    <span className='text-sm'>{post.likes_count?.length || 0}</span>
                </button>
                <button className='flex items-center gap-2 text-[#6C757D] hover:text-[#28C76F] transition'>
                    <Repeat2 className='w-5 h-5' />
                </button>
                <button onClick={() => setShowAuthority(!showAuthority)} className='group flex items-center gap-2 text-[#6C757D] hover:text-[#1A4E8A] transition'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-[#1A4E8A]/10 text-[#1A4E8A] group-hover:bg-[#1A4E8A] group-hover:text-white transition-all duration-300 font-bold text-xs group-hover:scale-110'>
                        A
                    </div>
                    <span className='text-sm'>{authorityResponses.length}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className='flex items-center gap-2 text-[#6C757D] hover:text-[#007BFF] transition'>
                    <MessageCircle className='w-5 h-5' />
                    <span className='text-sm'>{comments.length}</span>
                </button>
                <button className='flex items-center gap-2 text-[#6C757D] hover:text-[#212529] transition'>
                    <Share2 className='w-5 h-5' />
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className='border-t border-gray-200 pt-4 space-y-3'>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Write a comment...'
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] text-sm'
                        />
                        <button
                            onClick={() => {
                                if (comment.trim()) {
                                    setComments([...comments, { text: comment, time: new Date() }])
                                    setComment('')
                                }
                            }}
                            className='px-4 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition'
                        >
                            <Send className='w-4 h-4' />
                        </button>
                    </div>
                    {comments.map((c, i) => (
                        <div key={i} className='bg-[#F8F9FA] p-3 rounded-lg'>
                            <p className='text-sm text-[#212529]'>{c.text}</p>
                            <span className='text-xs text-[#6C757D]'>{moment(c.time).fromNow()}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Authority Response Section */}
            {showAuthority && (
                <div className='border-t border-gray-200 pt-4 space-y-3'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='w-6 h-6 rounded-full bg-[#1A4E8A] text-white flex items-center justify-center font-bold text-xs'>
                            A
                        </div>
                        <span className='text-sm font-medium text-[#1A4E8A]'>Authority Responses</span>
                    </div>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={authorityComment}
                            onChange={(e) => setAuthorityComment(e.target.value)}
                            placeholder='Write an authority response...'
                            className='flex-1 px-3 py-2 border border-[#1A4E8A] rounded-lg focus:outline-none focus:border-[#1A4E8A] text-sm'
                        />
                        <button
                            onClick={() => {
                                if (authorityComment.trim()) {
                                    setAuthorityResponses([...authorityResponses, { text: authorityComment, time: new Date() }])
                                    setAuthorityComment('')
                                }
                            }}
                            className='px-4 py-2 bg-[#1A4E8A] text-white rounded-lg hover:bg-[#153d6f] transition'
                        >
                            <Send className='w-4 h-4' />
                        </button>
                    </div>
                    {authorityResponses.map((r, i) => (
                        <div key={i} className='bg-[#1A4E8A]/5 border border-[#1A4E8A]/20 p-3 rounded-lg'>
                            <p className='text-sm text-[#212529]'>{r.text}</p>
                            <span className='text-xs text-[#6C757D]'>{moment(r.time).fromNow()}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default PostCard
