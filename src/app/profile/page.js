"use client"

import { useState, useEffect } from "react";
import { getUsers } from "../data/users";

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