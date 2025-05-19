"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  
  const publicPaths = ['/login', '/register'];
  
  useEffect(() => {
    const isPublicPath = publicPaths.some(pp => pathname === pp);
    

    const tokenString = localStorage.getItem('gear_token');
    const hasToken = !!tokenString;
    
    if (!isPublicPath && !hasToken) {

      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (isLoading) return null;
  
  return children;
}