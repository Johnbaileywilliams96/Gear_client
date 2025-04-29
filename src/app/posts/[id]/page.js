"use client"

import { useState, useEffect } from "react";
import { getPostsById } from "@/app/data/posts";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/navbar";

export default function Post() {
  const [post, setPost] = useState(null)
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
    getPostsById(id).then(data => {
      console.log("Post data:", data); // For debugging
      setPost(data);
    })
  }, [id])

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <div className="flex flex-col items-center space-y-8">
          {post ? (
            <>
              <div className="border border-cyan-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md w-full">
                <h1 className="text-xl font-bold text-cyan-700 mb-2">{post.title}</h1>
                {post.image_path && (
                  <div className="mb-4">
                    <img src={post.image_path} alt={post.title} className="max-w-full h-auto rounded" />
                  </div>
                )}
                <div className="bg-cyan-50 p-3 rounded mb-4">
                  <p className="text-gray-700">{post.description}</p>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Tags</h2>
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
              
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-4">Comments</h2>
                {post.post_comments && post.post_comments.length > 0 ? (
                  <div className="space-y-4">
                    {post.post_comments.map((comment, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center mb-2">
                          <div className="font-medium">{comment.user?.username || 'Anonymous'}</div>
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
              <p className="text-gray-500">Loading post...</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}