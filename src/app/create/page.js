"use client"

import { useState, useEffect } from "react";
import { addPost } from "../data/posts";
import Navbar from "../Components/navbar";

export default function CreatePost() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('')
  const [image_path, setImagePath] = useState(null)
  
  useEffect(() => {
       addPost().then(data => setPosts(data))
  }, [])

  const handlePostCreation = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  }

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  const createProductImageString = (event) => {
    if (event.target.files && event.target.files[0]) {
      getBase64(event.target.files[0], (base64ImageString) => {
        // Pass the image data up to the parent component
        setImagePath(base64ImageString);
      });
    }
  }

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen pt-16 pb-8 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>
          <form onSubmit={handlePostCreation}>
            <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"> 
                Title 
              </label>
              <input 
                type="text" 
                id="title"
                value={title}
                onChange={evt => setTitle(evt.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter title"
                required 
                autoFocus 
              />
            </fieldset>
            <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"> 
                Description 
              </label>
              <textarea 
                id="description"
                value={description}
                onChange={evt => setDescription(evt.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Enter description"
                required 
              />
            </fieldset>
            <fieldset className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Image
              </label>
              <input 
                type="file" 
                id="image_path" 
                onChange={createProductImageString} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {image_path && (
                <div className="mt-2">
                  <img src={image_path} alt="Product preview" className="max-w-full h-auto max-h-48" />
                </div>
              )}
            </fieldset>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}