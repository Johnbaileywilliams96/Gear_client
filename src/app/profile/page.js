"use client"

import { useState, useEffect } from "react";
import { getUsers } from "../data/users";
import Navbar from "../Components/navbar";

export default function Profile() {
  const [profiles, setProfiles] = useState([])

  
  useEffect(() => {
    getUsers()
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
            <div key={index}>
              <p>{profile.email}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}