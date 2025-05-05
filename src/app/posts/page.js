"use client"

import { useState, useEffect } from "react";
import { getPosts } from "../data/posts";
import Navbar from "../Components/navbar";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Number of posts per page
  
  useEffect(() => {
    setIsLoading(true);
    getPosts().then(data => {
      const sortedPosts = [...data].reverse();
      setPosts(sortedPosts);
      setIsLoading(false);
    });
  }, []);

  // Helper function to get likes count
  const getLikesCount = (post) => {
    return post.post_likes ? post.post_likes.length : 0;
  };

  // Helper function to get comments count
  const getCommentsCount = (post) => {
    return post.post_comments ? post.post_comments.length : 0;
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };
  
  // Go to previous page
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
            <p className="text-center text-gray-500">No posts found.</p>
          )}
        </div>
        
        {/* Pagination */}
        {!isLoading && posts.length > 0 && (
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
        {!isLoading && posts.length > 0 && (
          <div className="text-center mt-4 text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </>
  );
}