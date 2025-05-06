"use client"

import { useState, useEffect } from "react";
import { deletePost, getPostsById } from "@/app/data/posts";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/navbar";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/app/data/likes";

export default function Post() {
  const [post, setPost] = useState(null)
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams()
  const router = useRouter()
  const {id} = params
  
  useEffect(() => {
    getPostsById(id).then(data => {
      setPost(data);

      const initialLikesCount = data.post_likes ? data.post_likes.length : 0;
      setLikesCount(initialLikesCount);

      const currentUserId = getCurrentUserId();
      const userHasLiked = data.post_likes && data.post_likes.some(like => 
        like.user && like.user.id === currentUserId
      );
      setIsLiked(userHasLiked);
      
      setIsLoading(false);
    })
  }, [id])

  const getCurrentUserId = () => {
    try {
      const authInfoString = localStorage.getItem('gear_token');
      if (!authInfoString) return null;
      
      const authInfo = JSON.parse(authInfoString);
      return authInfo.user_id;
    } catch (error) {
      console.error("Error getting current user ID:", error);
      return null;
    }
  };

  const handleToggleLike = async () => {
    try {
      const result = await toggleLike(id);
      setLikesCount(result.likes_count);
      setIsLiked(result.status === "liked");
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDeletePost = () => {
    deletePost(id)
    router.push(`/posts`);
  }

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <div className="flex flex-col items-center space-y-8">
          {isLoading ? (
            <div className="text-center">
              <p className="text-gray-500">Loading post...</p>
            </div>
          ) : post ? (
            <>
              {/* Post Card - Keeping original size */}
              <div className="border border-cyan-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md w-full">
                {/* Post title and username side by side */}
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-xl font-bold text-cyan-700">{post.title}</h1>
                  <span className="text-sm text-cyan-600"><span className="font-medium">{post.user.username}</span></span>
                </div>
                
                {post.image_path && (
                  <div className="mb-4">
                    <img src={post.image_path} alt={post.title} className="max-w-full h-auto rounded" />
                  </div>
                )}
                
                <div className="bg-cyan-50 p-3 rounded mb-4">
                  <p className="text-gray-700">{post.description}</p>
                </div>
                
                <div>
                  {/* Tags header with like button */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Tags</h2>
                    
                    {/* Like button */}
                    <button 
                      onClick={handleToggleLike}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                        isLiked 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLiked ? 'text-red-600' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{isLiked ? 'Liked' : 'Like'} • {likesCount}</span>
                    </button>
                  </div>
                  
                  {/* Tags content */}
                  {post.post_tags && post.post_tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.post_tags.map((postTag, index) => (
                        <span 
                          key={index}
                          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {postTag.tag.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No tags for this post</p>
                  )}
                </div>
              </div>
              
              {/* Action Buttons Row - Placed outside the card */}
              <div className="flex flex-wrap gap-3 w-full max-w-md justify-center">
                <button 
                  onClick={() => router.push(`/posts/${id}/comment`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-1"
                >
                  <span>Add Comment</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                
                {post.is_Owner && (
                  <>
                    <button 
                      onClick={() => router.push(`/posts/${id}/edit`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-1"
                    >
                      <span>Edit Post</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => handleDeletePost(id)}
                      className="bg-red-400 hover:bg-red-500 text-black font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-1"
                    >
                      <span>Delete Post</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Comments Section */}
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-4">Comments</h2>
                {post.post_comments && post.post_comments.length > 0 ? (
                  <div className="space-y-4">
                    {post.post_comments.map((comment, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center mb-2">
                          <div className="font-medium text-black">{comment.user?.username || 'Anonymous'}</div>
                          <div className="text-xs text-gray-500 ml-2">
                            {new Date(comment.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-black">
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No comments yet.</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">Post not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}