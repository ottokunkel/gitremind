import { createClient } from "@/lib/supabase/client";
import { UserSettings } from "@/types/settings";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";



export function useSettings(user: User | null): {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null; 
} {
   const supabase = createClient()
   const [settings, setSettings] = useState<UserSettings | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
    const fetchSettings = async () => {
      if (!user) {
        setLoading(false)
        return
      }
     
      setLoading(true)

      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user', user.id)
        .single();

      if (error) {
        setError(error.message)
      } else {
        setSettings(data)
      }

      setLoading(false)
    }
    fetchSettings()
   }, [user, supabase])

   return { settings, loading, error }
}