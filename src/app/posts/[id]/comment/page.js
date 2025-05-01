"use client"

import Navbar from "@/app/Components/navbar"
import {  postComment } from "@/app/data/comments"
import { getPostsById } from "@/app/data/posts"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function CreateComment() {
    const [content, setContent] =useState('')
    const [post, setPost] = useState(null)
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = params


    useEffect(() => {
        getPostsById(id).then(data => {
          console.log("Post data:", data); // For debugging
          setPost(data);
        })
      }, [id])

      const handleCommentCreation = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const commentData = {
            content: content
        };
    
        postComment(id, commentData)
            .then(newComment => {
                console.log('Comment created successfully:', newComment);
                setContent('');
                setIsLoading(false);
                router.push(`/posts/${id}`);
            })
            .catch(error => {
                console.error('Failed to create comment:', error);
                setIsLoading(false);
                setError('Failed to create comment. Please try again.');
            });
    };


  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Add a Comment</h1>
        <form onSubmit={handleCommentCreation}>

        <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"> 
                Content 
              </label>
              <textarea 
                id="content"
                value={content}
                onChange={evt => setContent(evt.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Enter content"
                required 
              />
            </fieldset>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  ${isLoading ? 'bg-yellow-300' : 'bg-yellow-400 hover:bg-yellow-500'} 
                  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors
                `}
              >
                {isLoading ? 'Creating...' : 'Add'}
              </button>
            </div>

        </form>
        

      </div>
    </>
  )
}