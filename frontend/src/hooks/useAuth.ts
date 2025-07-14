import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * Custom hook to handle authentication state and actions
 */
export function useAuth(): {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
} {
  const supabase = createClient()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)


  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()

        setUser(currentUser)

      } catch (err) {
        console.error('useAuth: fetchUser failed', err)

      } finally {
        setLoading(false)

      }
    }
    fetchUser()
  }, [supabase])

  // Sign out the user and redirect to the home page
  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
  }, [supabase, router])


  return { user, loading, signOut }
}
