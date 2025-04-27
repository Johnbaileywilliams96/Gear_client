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
      <div>
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <PostCard post = {post}/>
            </div>
          )
        })}
      </div>
    </>
  )
}