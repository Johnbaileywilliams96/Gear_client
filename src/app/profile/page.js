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
   
      <div>
        <Navbar/>
        {profiles.map((profile, index) => {
          return (
            <div key={index}>
              <p>{profile.bio}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}