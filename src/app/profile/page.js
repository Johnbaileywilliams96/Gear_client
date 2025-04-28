"use client"

import { useState, useEffect } from "react";
import { getProfiles } from "../data/profiles";
import Navbar from "../Components/navbar";

export default function Profile() {
  const [profiles, setProfiles] = useState([])
  
  useEffect(() => {
    getProfiles()
      .then(data => {
        setProfiles(data)
      })
  }, [])

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
        <div className="grid gap-6">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Bio</h2>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No profiles found.</p>
          )}
        </div>
      </div>
    </>
  )
}