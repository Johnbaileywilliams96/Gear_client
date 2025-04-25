"use client"


import Link from 'next/link'
// import { useRouter } from 'next/router'
import { useRef } from 'react'
// import { input } from '../components/form-elements'
// import Layout from '../components/layout'
// import Navbar from '../components/navbar'
// import { useAppContext } from '../context/state'
// import { register } from '../data/auth'

export default function Register() {
  // const {setToken} = useAppContext()

  const firstName = useRef('')
  const lastName = useRef('')
  const username = useRef('')
  const password = useRef('')
  const email = useRef('')
  // const phone_number = useRef('')
  // const address = useRef('')
  // const router = useRouter()



  const submit = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      email: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
    }

    register(user).then((res) => {
      console.log(res)
      if (res.token) {
        setToken(res.token)
        router.push('/')
      }
    })
  }

//   login(user).then((res) => {
//     if (res.token) {
//       setToken(res.token)
//       router.push('/')
//     }
//   })
// }


  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box">
          <h1 className="title">Welcome!</h1>
          <input
            id="firstName"
            refEl={firstName}
            type="text"
            label="First Name"
          />
          <input
            id="lastName"
            refEl={lastName}
            type="text"
            label="Last Name"
          />

          <input
            id="username"
            refEl={username}
            type="text"
            label="Username"
          />
          <input
            id="password"
            refEl={password}
            type="password"
            label="Password"
          />
          <input
            id="email"
            refEl={email}
            type="text"
            label="Email"
          />
      
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={submit}>Submit</button>
            </div>
            <div className="control">
              <Link href="/login">
                <button className="button is-link is-light">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
