"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {
    const [email, setEmail] = useState("Email")
    const [password, setPassword] = useState("password")
    const [firstName, setFirstName] = useState("first_name")
    const [lastName, setLastName] = useState("Last_name")
    const existDialog = useRef()
    const router = useRouter()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/register`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo && authInfo.token) {
                    localStorage.setItem("gear_token", JSON.stringify(authInfo))
                    router.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
            <dialog className="dialog dialog--auth rounded-md shadow-md p-6 bg-gray-800 text-white" ref={existDialog}>
                <div className="mb-4 font-medium text-red-400">User does not exist</div>
                <button 
                    className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500" 
                    onClick={e => existDialog.current.close()}>
                    Close
                </button>
            </dialog>

            <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg border border-gray-700">
                <form className="flex flex-col" onSubmit={handleRegister}>
                    <h1 className="text-center text-4xl font-bold text-blue-400 mb-2">GearSpot</h1>
                    <h2 className="text-center text-xl mb-8 text-gray-300">Register new account</h2>
                    
                    <fieldset className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="firstName">
                            First name
                        </label>
                        <input 
                            type="text" 
                            id="firstName"
                            value={firstName}
                            onChange={evt => setFirstName(evt.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                            required 
                            autoFocus 
                        />
                    </fieldset>
                    
                    <fieldset className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="lastName">
                            Last name
                        </label>
                        <input 
                            type="text" 
                            id="lastName"
                            value={lastName}
                            onChange={evt => setLastName(evt.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                            required 
                        />
                    </fieldset>
                    
                    <fieldset className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="inputEmail">
                            Email address
                        </label>
                        <input 
                            type="email" 
                            id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                            placeholder="Email address"
                            required 
                        />
                    </fieldset>
                    
                    <fieldset className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="inputPassword">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                            placeholder="Password"
                        />
                    </fieldset>
                    
                    <fieldset>
                        <button 
                            type="submit" 
                            className="w-full rounded-md bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-500 transition-colors">
                            Register
                        </button>
                    </fieldset>
                </form>
                
                <div className="mt-6 text-center">
                    <Link 
                        className="text-blue-400 hover:text-blue-300 hover:underline" 
                        href="/login">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </main>
    )
}