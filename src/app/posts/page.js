"use client"

import { useState, useEffect } from "react";
import { getPosts } from "../data/posts";
import Navbar from "../Components/navbar";
import Link from "next/link";


export default function Posts() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
       getPosts().then(data => setPosts(data))
  }, [])

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="flex justify-center">
                
                <div className="border border-cyan-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md">
                  <Link href={`/posts/${post.id}`}>
                    <h1 className="text-xl font-bold text-cyan-700 mb-2 hover:underline">{post.title}</h1>
                    {post.image_path && (
                  <div className="mb-4">
                    <img src={post.image_path} alt={post.title} className="max-w-full h-auto rounded" />
                  </div>
                )}
                  </Link>
                  <div className="bg-cyan-50 p-3 rounded">
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
                </div>
              
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
          
        </div>
      </div>
    </>
  )
}