"use client"

import { useState, useEffect } from "react";
import { getProfileById } from "@/app/data/profiles";
import Navbar from "@/app/Components/navbar";
import { useParams } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const {id} = params;
  
  useEffect(() => {
    setIsLoading(true);
    getProfileById(id)
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
  }, [id]);
  
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
              {profile.profile_picture && (
                <img 
                  src={profile.profile_picture} 
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
            
            {profile.bio && (
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Bio</h4>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            )}
            
            {/* Add more profile details as needed */}
          </div>
        )}
      </div>
    </>
  );
}