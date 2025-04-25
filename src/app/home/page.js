"use client"

import Link from "next/link"



export default function GearSpot() {

  return (
    <>
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