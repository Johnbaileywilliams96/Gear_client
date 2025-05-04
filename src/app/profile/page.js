"use client"

import { useState, useEffect } from "react";
import { getCurrentUser, getProfileById } from "@/app/data/profiles";
import Navbar from "@/app/Components/navbar";
import { useRouter } from "next/navigation";


export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()
  
  
  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then(data => {
        console.log("Profile data:", data); // For debugging
        setProfile(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        
        {isLoading && (
          <div className="text-center py-8">
            <p>Loading profile...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {profile && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              {profile.profile_image && (
                <img 
                  src={profile.profile_image} 
                  alt={`${profile.user?.username || 'User'}'s profile`}
                  className="w-24 h-24 rounded-full mr-4 object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">
                  {profile.user?.username || 'User'}
                </h3>
                {profile.location && (
                  <p className="text-gray-600">{profile.location}</p>
                )}
              </div>
            </div>
            <h2>BIO</h2>
            <h3>
            {profile.bio}   
            </h3>
            <button 
              type="button"
              onClick={() => router.push(profile?.id ? `/profile/${profile.id}` : '/edit-profile')} // Navigate to the edit profile page
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-1 mt-4"
            >
              <span>Edit Profile</span> {/* Changed from "Edit Post" to "Edit Profile" */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {profile && profile.user_posts && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
                    
                    {profile.user_posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.user_posts.map(post => (
                        <div 
                            key={post.id} 
                            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => router.push(`/posts/${post.id}`)}
                        >
                            {post.image_path && (
                            <img src={post.image_path} alt={post.title} className="h-40 w-full object-cover" />
                            )}
                            <div className="p-4">
                            <h3 className="font-bold">{post.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-gray-500">No posts yet.</p>
                    )}
                </div>
                )}
           
          </div>
        )}
      </div>
    </>
  );
}