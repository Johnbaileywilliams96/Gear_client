"use client"

import Link from "next/link"
import Navbar from "./Components/navbar"

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">welcome</h1>
        <p className="text-xl mb-6">GearSpot</p>
        <Link href={`/posts`}>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Gear
          </button>
        </Link>
      </div>
    </>
  )
}