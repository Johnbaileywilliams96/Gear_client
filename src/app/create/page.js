"use client"

import { useState, useEffect } from "react";
import { addPost } from "../data/posts";
import Navbar from "../Components/navbar";
import { getTags } from "../data/tags";

export default function CreatePost() {
//   const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('')
  const [image_path, setImagePath] = useState(null)
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  
//   useEffect(() => {
//     addPost().then(data => setPosts(data))
//   }, [])

  useEffect(() => {
    getTags().then(data => setTags(data))
  }, [])

  // Add this to your component
  useEffect(() => {
    const authInfo = localStorage.getItem('gear_token');
    console.log('Stored auth info:', authInfo);
    try {
        const parsed = JSON.parse(authInfo);
        console.log('Parsed auth info:', parsed);
    } catch (e) {
        console.error('Error parsing auth info:', e);
    }
}, []);

  const handlePostCreation = (e) => {
    e.preventDefault();
    
    // Create post object from form data matching your backend's expected format
    const postData = {
        title: title,
        description: description,
        imag_path: image_path // Notice the spelling matches your backend (imag_path, not image_path)
    };
    
    addPost(postData)
        .then(newPost => {
            console.log('Post created successfully:', newPost);
            
            // If you need to handle tags separately, you can make additional API calls here
            // For example, if you have a separate endpoint to connect posts and tags:
            // addPostTags(newPost.id, selectedTags)
            
            // Reset form after successful creation
            setTitle('');
            setDescription('');
            setImagePath(null);
            setSelectedTags([]);
            
            alert('Post created successfully!');
        })
        .catch(error => {
            console.error('Failed to create post:', error);
            alert('Failed to create post. Please try again.');
        });
};

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

  const handleTagChange = (tagId) => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter(id => id !== tagId);
      } else {
        return [...prevSelectedTags, tagId];
      }
    });
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
            <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"> 
                Tags 
              </label>
              <div className="max-h-48 overflow-y-auto border rounded p-3">
                {tags.length > 0 ? (
                  tags.map(tag => (
                    <div key={tag.id} className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        id={`tag-${tag.id}`}
                        value={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`tag-${tag.id}`} className="text-gray-700">
                        {tag.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Loading tags...</p>
                )}
              </div>
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