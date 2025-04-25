"use client"

import Link from "next/link"
import Navbar from "../Components/navbar"



export default function GearSpot() {

  return (
    <>
    <Navbar/>
      <div>
      <h1>welcome</h1>
      <Link href={`/posts`}>
        <button
        style={{

          backgroundColor: 'red'
        }
        }>
          Gear
          </button>
      </Link>
      </div>
    </>
  )
}