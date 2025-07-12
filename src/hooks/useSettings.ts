import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type Settings = {
  phone: string;
  reminder: boolean;
}

export function useSettings(user: User | null): {
  settings: Settings | null;
  loading: boolean;
  error: string | null; 
} {
   const supabase = createClient()
   const [settings, setSettings] = useState<Settings | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
    const fetchSettings = async () => {
     
      // Fetch the settings for the user
      setLoading(true)

      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user', user?.id)
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