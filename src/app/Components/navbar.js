"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  // Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem("gear_token")
    setIsLoggedIn(token !== null)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("gear_token")
    setIsLoggedIn(false)
    router.push('/')
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
          {isLoggedIn ? (
            <>
              <Link href="/posts" className="text-black hover:text-gray-700">
                Posts
              </Link>
              <Link href="/profile" className="text-black hover:text-gray-700">
                Profile
              </Link>
              <Link href="/home" className="text-black hover:text-gray-700">
                Home
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-black hover:text-gray-700">
                Login
              </Link>
              <Link href="/register" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 right-0 left-0 bg-yellow-400 p-4 shadow-md">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-4">
                <Link href="/posts" className="text-black hover:text-gray-700">
                  Posts
                </Link>
                <Link href="/profile" className="text-black hover:text-gray-700">
                  Profile
                </Link>
                <Link href="/home" className="text-black hover:text-gray-700">
                  Home
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-left text-black hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link href="/login" className="text-black hover:text-gray-700">
                  Login
                </Link>
                <Link href="/register" className="text-black hover:text-gray-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}