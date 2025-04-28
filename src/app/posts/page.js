"use client"

import { useState, useEffect } from "react";
import { getPosts } from "../data/posts";
import { PostCard } from "../Components/postlayout/card";
import Navbar from "../Components/navbar";


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
                <PostCard post={post}/>
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