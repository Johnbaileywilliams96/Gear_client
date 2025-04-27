"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-yellow-400 p-4 fixed top-0 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="w-16 h-16" />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5"
          onClick={toggleMenu}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/posts" className="text-black hover:text-gray-700">
            Posts
          </Link>
          <Link href="/profile" className="text-black hover:text-gray-700">
            Profile
          </Link>
          <Link href="/home" className="text-black hover:text-gray-700">
            Home
          </Link>
          <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100">
            Logout
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-yellow-400 p-4 shadow-md z-50">
            <div className="flex flex-col space-y-3">
              <Link href="/posts" className="text-black hover:text-gray-700 py-2">
                Posts
              </Link>
              <Link href="/profile" className="text-black hover:text-gray-700 py-2">
                Profiles
              </Link>
              <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 text-center">
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}