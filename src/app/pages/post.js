"use client"

import { useState, useEffect } from "react";
import { PostCard } from "../../Components/postlayout/card";
import { getPostsById } from "@/app/data/posts";
import { useParams } from "next/navigation";
import { CommentsCard } from "@/app/Components/commentslayout/card";
import { getComments } from "@/app/data/comments";

export default function Post() {
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
       getPostsById(id).then(data => setPost(data))
  }, [])

  useEffect(() => {
    getComments().then(data => setComments(data))
}, [])

console.log(comments)

  return (
    <>
            <div >
              <PostCard post = {post}/>
            </div>
            <div>
            <CommentsCard comment = {comments}/>
            </div>
       
    </>
  )
}