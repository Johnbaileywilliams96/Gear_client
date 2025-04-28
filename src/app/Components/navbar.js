"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  // Check login status when component mounts and set up event listener
  useEffect(() => {
    checkLoginStatus()
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('loginStateChange', checkLoginStatus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('loginStateChange', checkLoginStatus)
    }
  }, [])
  
  const checkLoginStatus = () => {
    const token = localStorage.getItem("gear_token")
    setIsLoggedIn(token !== null)
  }
  
  const handleStorageChange = (event) => {
    if (event.key === "gear_token") {
      checkLoginStatus()
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("gear_token")
    setIsLoggedIn(false)
    window.dispatchEvent(new Event('loginStateChange'))
    router.push('/')
  }

  return (
    <nav className="bg-yellow-400 p-2 fixed top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col space-y-1"
          onClick={toggleMenu}
        >
          <span className="block w-5 h-0.5 bg-black"></span>
          <span className="block w-5 h-0.5 bg-black"></span>
          <span className="block w-5 h-0.5 bg-black"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/posts" className="text-sm text-black hover:text-gray-700">
                Posts
              </Link>
              <Link href="/profile" className="text-sm text-black hover:text-gray-700">
                Profile
              </Link>
              <Link href="/home" className="text-sm text-black hover:text-gray-700">
                Home
              </Link>
              <Link href="/create" className="text-sm text-black hover:text-gray-700">
                create
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-white text-black text-sm px-3 py-1 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-black hover:text-gray-700">
                Login
              </Link>
              <Link href="/register" className="bg-white text-black text-sm px-3 py-1 rounded-md hover:bg-gray-100">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 right-0 left-0 bg-yellow-400 p-2 shadow-md">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <Link href="/posts" className="text-sm text-black hover:text-gray-700">
                  Posts
                </Link>
                <Link href="/profile" className="text-sm text-black hover:text-gray-700">
                  Profile
                </Link>
                <Link href="/home" className="text-sm text-black hover:text-gray-700">
                  Home
                </Link>
                <Link href="/create" className="text-sm text-black hover:text-gray-700">
                create
              </Link>
                <button 
                  onClick={handleLogout}
                  className="text-left text-sm text-black hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login" className="text-sm text-black hover:text-gray-700">
                  Login
                </Link>
                <Link href="/register" className="text-sm text-black hover:text-gray-700">
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