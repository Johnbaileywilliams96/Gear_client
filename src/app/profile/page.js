"use client"

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/data/profiles";
import Navbar from "@/app/Components/navbar";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then(data => {
        console.log("Profile data:", data);
        setProfile(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
        setIsLoading(false);
      });
  }, []);

  // Default profile image if none is provided
  const defaultProfileImage = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          
          {profile && (
            <button 
              onClick={() => router.push(profile?.id ? `/profile/${profile.id}` : '/edit-profile')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-8 8a2 2 0 01-.707.707l-3 1a1 1 0 01-1.293-1.293l1-3a2 2 0 01.707-.707l8-8z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {profile && !isLoading && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Cover photo area */}
            <div className="h-40 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200"></div>
            
            <div className="relative px-6 py-8">
              {/* Profile image */}
              <div className="absolute -top-16 left-6 border-4 border-white rounded-full shadow-lg overflow-hidden">
                <img 
                  src={profile.profile_image || defaultProfileImage} 
                  alt={`${profile.user?.username || 'User'}'s profile`}
                  className="w-32 h-32 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfileImage;
                  }}
                />
              </div>
              
              {/* User details */}
              <div className="mt-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {profile.user?.username || 'User'}
                    </h2>
                    {profile.location && (
                      <div className="mt-1 flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    {/* You can add social media links or other actions here */}
                  </div>
                </div>
                
                {/* Bio section */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Biography
                  </h3>
                  
                  {profile.bio ? (
                    <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                  ) : (
                    <p className="text-gray-400 italic">No bio provided yet. Click Edit Profile to add one!</p>
                  )}
                </div>
                
                {/* You can add additional sections here (posts, friends, etc.) */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Activity
                  </h3>
                  
                  <div className="text-center py-8">
                    <p className="text-gray-400">No recent activity to show.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-20 py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GearSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}