'use client'

import { createClient } from "@/lib/supabase/client"
import '@/styles/landing.scss'

export default function LandingPage() {
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
    <div className="landing">
      {/* Front image with exclusion blend mode */}
      <div className="landing__front-image"></div>

      <div className="landing__main-title">
        <h1>Git</h1>
        <h1 className="landing__main-title-sub">Remind</h1>
      </div>

      <button onClick={signInWithGithub} className="landing__join-button">
        Join
      </button>
      
    </div>
  );
}
