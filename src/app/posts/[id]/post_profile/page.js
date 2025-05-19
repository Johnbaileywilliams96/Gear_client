"use client"

import { useState, useEffect } from "react";
import { getCurrentUser, getProfileById } from "@/app/data/profiles";
import Navbar from "@/app/Components/navbar";
import { useParams, useRouter } from "next/navigation";
import { getUserProfile } from "@/app/data/auth";


export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()
  const {id} = params
  const router = useRouter()

  
  
  useEffect(() => {
    setIsLoading(true);
    getProfileById(id)
      .then(data => {

        setProfile(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
        setIsLoading(false);
      });
  }, [id]);


  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-black">Profile</h2>
        
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-black">Loading profile...</p>
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
                <h3 className="text-xl font-semibold text-black">
                  {profile.user?.username || 'User'}
                </h3>
                {profile.location && (
                  <p className="text-black">{profile.location}</p>
                )}
              </div>
            </div>
            <h2 className="text-black font-bold">BIO</h2>
            <h3 className="text-black">
              {profile.bio}   
            </h3>

            {profile && profile.user_posts && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-black">Posts</h2>
                    
                    {profile.user_posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.user_posts.map(post => (
                        <div 
                            key={post.id} 
                            onClick={() => router.push(`/posts/${post.id}`)}
                            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            {post.image_path && (
                            <img src={post.image_path} alt={post.title} className="h-40 w-full object-cover" />
                            )}
                            <div className="p-4">
                            <h3 className="font-bold text-black">{post.title}</h3>
                            <p className="text-sm text-black mt-1">
                                {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                            </p>
                            <p className="text-xs text-black mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-black">No posts yet.</p>
                    )}
                </div>
                )}

                {profile && profile.user_likes && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-black">Liked Posts</h2>
                    
                    {profile.user_likes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.user_likes.map(i => (
                        <div 
                            key={i.post.id}
                            onClick={() => router.push(`/posts/${i.post.id}`)}
                            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            {i.post.image_path && (
                            <img src={i.post.image_path} alt={i.post.title} className="h-40 w-full object-cover" />
                            )}
                            <div className="p-4">
                            <h3 className="font-bold text-black">{i.post.title}</h3>
                            <p className="text-sm text-black mt-1">{i.post.description}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-black">No posts yet.</p>
                    )}
                </div>
                )}
           
          </div>
        )}
      </div>
    </>
  );
}