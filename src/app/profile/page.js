"use client"

import { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import { getProfiles } from "../data/profiles";


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
      <div>
        {profiles.map((profile, index) => {
          return (
            <>
            <div key={index}>
              <p>{profile.bio}</p>
            </div>
            
            </>
          )
        })}
      </div>
    </>
  )
}