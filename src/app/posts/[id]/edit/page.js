"use client"

import Navbar from "@/app/Components/navbar";
import { editPost, getPostsById } from "@/app/data/posts";
import { getTags } from "@/app/data/tags"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"




export default function Edit() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [image_path, setImagePath] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams()
    const {id} = params
  
    useEffect(() => {
        getPostsById(id)
          .then(data => {
            console.log("Post data:", data);
            // Populate form fields with existing data
            setTitle(data.title);
            setDescription(data.description);
            setOriginalImagePath(data.image_path);
            
            // Extract tag IDs from post_tags
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
      console.log("Tags received:", data);
      // Transform the data to include the ID at the top level
      const processedTags = data.map(tag => {
        // Get the ID from the first post_tag if available, otherwise generate a temporary ID
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
    console.log("Tag clicked:", tagId);
    
    setSelectedTags(prevSelectedTags => {
      const newTags = prevSelectedTags.includes(tagId) 
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId];
      
      console.log("New selectedTags will be:", newTags);
      return newTags;
    });
  };

  const handleEditPost = (e) => {
    e.preventDefault();

    const postData = {
        title: title,
        description: description,
        tags: selectedTags
    };

    if (image_path){
        postData.image_path = image_path
    }


    editPost(id, postData)
        .then(updatedPost => {
          console.log('Post updated successfully:', updatedPost);
          router.push(`/posts/${id}`);
        })
        .catch(error => {
          console.error('Failed to update post:', error);
          setIsLoading(false);
          setError('Failed to update post. Please try again.');
        });
  }
 

  return (
    <>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <Navbar/>
        <h1 className="text-3xl font-bold text-center mb-8">Edit Post</h1>
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
    </>
  )
}