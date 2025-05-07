"use client"

import { useState, useEffect } from "react";
import { getPosts } from "../data/posts";
import Navbar from "../Components/navbar";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [postsPerPage] = useState(5); 
  
  useEffect(() => {
    setIsLoading(true);
    getPosts().then(data => {
      const sortedPosts = [...data].reverse();
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
      setIsLoading(false);
    });
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(results);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };
 
  const getLikesCount = (post) => {
    return post.post_likes ? post.post_likes.length : 0;
  };

  const getCommentsCount = (post) => {
    return post.post_comments ? post.post_comments.length : 0;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
        
        {/* Search Bar - Modified to be centered */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500" 
              placeholder="Search post titles..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button 
                onClick={clearSearch} 
                className="absolute right-2 bottom-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg text-xs px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Search Results Count - Modified to be centered */}
        {searchTerm && (
          <div className="mb-4 text-gray-600 text-center">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} matching "{searchTerm}"
          </div>
        )}
        
        <div className="grid gap-6">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <div key={post.id || index} className="flex justify-center">
                <div className="border border-cyan-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md w-full">
                  <Link href={`/posts/${post.id}`}>
                    <h2 className="text-xl font-bold text-cyan-700 mb-2 hover:underline">{post.title}</h2>
                    {post.image_path && (
                      <div className="mb-4">
                        <img src={post.image_path} alt={post.title} className="max-w-full h-auto rounded" />
                      </div>
                    )}
                  </Link>
                  <div className="bg-cyan-50 p-3 rounded mb-4">
                    <p className="text-gray-700">{post.description}</p>
                  </div>
                  
                  {/* Post stats - likes and comments */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{getLikesCount(post)} {getLikesCount(post) === 1 ? 'like' : 'likes'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span>{getCommentsCount(post)} {getCommentsCount(post) === 1 ? 'comment' : 'comments'}</span>
                    </div>
                  </div>
                  
                  {/* Tags section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    {post.post_tags && post.post_tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {post.post_tags.map((postTag, tagIndex) => {
                          // Skip if tag or tag.id is missing
                          if (!postTag.tag || !postTag.tag.id) return null;
                          
                          return (
                            <span 
                              key={tagIndex}
                              className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {postTag.tag.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No tags for this post</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {searchTerm ? "No posts matching your search." : "No posts found."}
            </p>
          )}
        </div>
        
        {/* Pagination */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
        
        {/* Page indicator */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="text-center mt-4 text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </>
  );
}