'use client'

import { createClient } from "@/lib/supabase/client"
import styles from "./page.module.css"

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
    <div className={styles.container}>
      {/* Front image with exclusion blend mode */}
      <div className={styles.frontImage}></div>

      <div className={styles.mainTitle}>
        <h1>Git</h1>
        <h1 className={styles.mainTitleSub}>Remind</h1>
      </div>

      <button onClick={signInWithGithub} className={styles.joinButton}>
        Join
      </button>
      
    </div>
  );
}
