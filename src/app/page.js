import Link from "next/link";
import Navbar from "./Components/navbar";


// src/app/page.js
export default function Home() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/register">Not a member yet?</Link>
          <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/login">already have an account?</Link>
        </form>
      </div>
    );
  }