"use client"

import { useState, useEffect } from "react";
import { addPost } from "../data/posts";
import Navbar from "../Components/navbar";
import { getTags } from "../data/tags"; // Import getTags instead of getPostTags

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [image_path, setImagePath] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Use getTags() instead of getPostTags()
    getTags().then(data => {
      console.log("Tags received:", data);
      setTags(data);
    }).catch(err => {
      console.error("Error loading tags:", err);
    });
  }, []);

  const handlePostCreation = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create post object from form data
    const postData = {
      title: title,
      description: description,
      tags: selectedTags
    };
    
    // Add image if one is selected
    if (image_path) {
      postData.image_path = image_path;
    }
    
    console.log("Sending post data:", postData);
    
    addPost(postData)
      .then(newPost => {
        console.log('Post created successfully:', newPost);
        
        // Reset form
        setTitle('');
        setDescription('');
        setImagePath(null);
        setSelectedTags([]);
        setIsLoading(false);
        
        alert('Post created successfully!');
      })
      .catch(error => {
        console.error('Failed to create post:', error);
        setIsLoading(false);
        setError('Failed to create post. Please try again.');
      });
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createProductImageString = (event) => {
    if (event.target.files && event.target.files[0]) {
      getBase64(event.target.files[0], (base64ImageString) => {
        setImagePath(base64ImageString);
      });
    }
  };

  const handleTagChange = (tagId) => {
    console.log("Tag clicked:", tagId);
    
    setSelectedTags(prevSelectedTags => {
      const newTags = prevSelectedTags.includes(tagId) 
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId];
      
      console.log("New selectedTags will be:", newTags);
      return newTags;
    });
  };

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen pt-16 pb-8 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
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
                disabled={isLoading}
                className={`
                  ${isLoading ? 'bg-yellow-300' : 'bg-yellow-400 hover:bg-yellow-500'} 
                  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors
                `}
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}