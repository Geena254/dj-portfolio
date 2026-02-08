"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminFooter from "@/components/admin/admin-footer"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import CustomCursor from "@/components/custom-cursor"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    } catch (error) {
      console.error("Error checking auth:", error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-black text-white w-full flex items-center justify-center">
        <CustomCursor />
        <Navbar />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white w-full">
      <CustomCursor />
      <Navbar />
      <BackToTop />
      {isAuthenticated ? (
        <>
          <AdminDashboard onLogout={handleLogout} />
          <AdminFooter />
        </>
      ) : (
        <AdminLogin onLoginSuccess={checkAuth} />
      )}
    </div>
  )
}
