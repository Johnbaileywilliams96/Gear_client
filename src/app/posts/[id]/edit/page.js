"use client"

import Navbar from "@/app/Components/navbar";
import { editPost, getPostsById } from "@/app/data/posts";
import { getTags } from "@/app/data/tags"
import { useParams, useRouter } from "next/navigation" // Import useRouter
import { useEffect, useState } from "react"

export default function Edit() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [image_path, setImagePath] = useState(null);
    const [originalImagePath, setOriginalImagePath] = useState(null); // Add this missing state
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter(); // Add router for navigation

    const {id} = params;
  
    useEffect(() => {
        getPostsById(id)
          .then(data => {
           
            setTitle(data.title);
            setDescription(data.description);
            setOriginalImagePath(data.image_path);
            

            if (data.post_tags && data.post_tags.length > 0) {
              const postTagIds = data.post_tags.map(pt => pt.tag.id);
              setSelectedTags(postTagIds);
            }
            
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Error loading post:", err);
            setError("Failed to load post data");
            setIsLoading(false);
          });
      }, [id]);

    useEffect(() => {
      getTags().then(data => {
        const processedTags = data.map(tag => {
          const id = tag.post_tags && tag.post_tags.length > 0 && tag.post_tags[0].tag ? 
                     tag.post_tags[0].tag.id : tag.name;
          return {
            id: id,
            name: tag.name
          };
        });
        setTags(processedTags);
      }).catch(err => {
        console.error("Error loading tags:", err);
      });
    }, []);

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

      setSelectedTags(prevSelectedTags => {
        const newTags = prevSelectedTags.includes(tagId) 
          ? prevSelectedTags.filter(id => id !== tagId)
          : [...prevSelectedTags, tagId];
        
        return newTags;
      });
    };

    const handleEditPost = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true while submitting

        const postData = {
            title: title,
            description: description,
            tags: selectedTags
        };

        if (image_path) {
            postData.image_path = image_path;
        }

        editPost(id, postData)
            .then(updatedPost => {
                console.log('Post updated successfully:', updatedPost);
                router.push(`/posts/${id}`); // Navigate back to the post
            })
            .catch(error => {
                console.error('Failed to update post:', error);
                setIsLoading(false);
                setError('Failed to update post. Please try again.');
            });
    }

    return (
        <>
                <Navbar/>
            <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8">Edit Post</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                {isLoading && !title ? (
                    <div className="text-center py-8">
                        <p>Loading post data...</p>
                    </div>
                ) : (
                    <form onSubmit={handleEditPost}>
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
                          {originalImagePath && !image_path && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-500 mb-2">Current image:</p>
                              <img src={originalImagePath} alt="Current image" className="max-w-full h-auto max-h-48 rounded" />
                            </div>
                          )}
                          <input 
                            type="file" 
                            id="image_path" 
                            onChange={createProductImageString} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {image_path && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500 mb-2">New image preview:</p>
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
                                    checked={selectedTags.includes(tag.id)} // Add checked prop
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
                        
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            type="button"
                            onClick={() => router.push(`/posts/${id}`)}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                              ${isLoading ? 'bg-yellow-300' : 'bg-yellow-400 hover:bg-yellow-500'} 
                              text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors
                            `}
                          >
                            {isLoading ? 'Updating...' : 'Update Post'}
                          </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}