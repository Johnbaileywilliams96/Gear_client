"use client"

import Link from "next/link"
import Navbar from "../Components/navbar"

export default function GearSpot() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome To GearSpot</h1>

        <Link href={`/posts`}>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors mb-8"
          >
            Gear
          </button>
        </Link>

        <div className="bg-grey-100 p-6 rounded-lg border-2 border-cyan-500 shadow-md max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-cyan-600">About</h2>
          
          <div className="space-y-4">
            <p className="text-white text-lg text-center">
              GearSpot is an application made by musicians for musicians. Our platform is a social 
              community designed specifically for gear enthusiasts to showcase their newly acquired 
              equipment.
            </p>
            
            <p className="text-white text-lg text-center">
              Whether it's a vintage guitar, a cutting-edge synthesizer, or a custom drum kit, 
              GearSpot gives you a place to share your passion with fellow musicians who understand 
              the excitement of new gear.
            </p>
            
            <p className="text-white text-lg text-center">
              Connect with other gear heads, discover interesting equipment, and join conversations 
              through likes and comments. GearSpot is your destination to celebrate and explore the 
              tools that create the music we love.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}