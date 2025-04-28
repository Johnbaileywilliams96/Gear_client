"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  
  const publicPaths = ['/login', '/register'];
  
  useEffect(() => {
    // Check if path is public
    const isPublicPath = publicPaths.some(pp => pathname === pp);
    
    // Get token from localStorage
    const tokenString = localStorage.getItem('gear_token');
    const hasToken = !!tokenString;
    
    if (!isPublicPath && !hasToken) {
      // Not logged in and trying to access protected route
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);
  
  // Show nothing while checking authentication
  if (isLoading) return null;
  
  return children;
}