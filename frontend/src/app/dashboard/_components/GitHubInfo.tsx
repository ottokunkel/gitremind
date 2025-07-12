import { User } from '@supabase/supabase-js'
import React from 'react'
import Image from 'next/image'

interface GitHubInfoProps {
  user: User
}

const GitHubInfo = ({ user }: GitHubInfoProps) => {
  const githubUsername = user.user_metadata?.user_name || user.user_metadata?.login
  const githubAvatar = user.user_metadata?.avatar_url

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full p-4">
      <h2 className="text-lg font-bold">GitHub Info</h2>
      <hr className="w-full"></hr>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {githubAvatar && (
          <div className="flex items-center justify-center">
            <Image
              src={githubAvatar}
              alt="GitHub Avatar"
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-300"
            />
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <p><strong>GitHub Username:</strong> {githubUsername || 'Not provided'}</p>
        </div>
      </div>
    </div>
  )
}

export default GitHubInfo