'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function page() {
  const supabase = createClient()

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Main card: */}
      <div className="border-2 border-gray-300 rounded-md p-4 gap-8 flex flex-col items-center justify-center">
        {/* Header: */}
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <header className="text-2xl font-bold">git remind</header>
          <hr className="w-full"></hr>
        </div>
        
        {/* Description: */}
        <Button onClick={signInWithGithub}> Sign in with Github</Button>

      </div>
    </div>
  );
}
