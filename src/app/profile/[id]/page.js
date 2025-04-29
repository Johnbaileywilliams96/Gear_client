"use client"

import { useState, useEffect } from "react";
import { getProfileById } from "@/app/data/profiles";
import Navbar from "@/app/Components/navbar";
import { useParams } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
    // Reset state at the beginning of fetch
    setLoading(true)
    setError(null)
    
    // Check if id exists
    if (!id) {
      setError("No profile ID provided")
      setLoading(false)
      return
    }
    useEffect(() => {
        if (id === undefined || id === 'undefined') {
          console.error("Invalid profile ID:", id);
          return;
        }
        
        setLoading(true);
        getProfileById(id)
          // Rest of your code...
      }, [id]);
    
    // Fetch profile data
    getProfileById(id)
      .then(data => {
        console.log("Profile data:", data) // For debugging
        setProfile(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile")
        setLoading(false)
      })
  }, [id])

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        ) : profile ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              {profile.profile_image && (
                <div className="mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={profile.profile_image} 
                    alt={`${profile.user?.first_name || 'User'}'s profile`} 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {profile.user?.first_name} {profile.user?.last_name}
                </h2>
                <p className="text-gray-600 mb-2">@{profile.user?.username}</p>
                <p className="text-gray-500 text-sm">Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Bio</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded">{profile.bio || 'No bio provided'}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No profile found for ID: {id}</p>
          </div>
        )}
      </div>
    </>
  )
}