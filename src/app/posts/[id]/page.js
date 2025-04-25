"use client"

import { useState, useEffect } from "react";
import { PostCard } from "../../Components/postlayout/card";
import { getPostsById } from "@/app/data/posts";
import { useParams } from "next/navigation";

export default function Post() {
  const [post, setPost] = useState([])
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
       getPostsById(id).then(data => setPost(data))
  }, [])

  return (
    <>
            <div >
              <PostCard post = {post}/>
            </div>
       
    </>
  )
}