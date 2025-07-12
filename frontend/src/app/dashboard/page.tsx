'use client'
import { redirect } from 'next/navigation'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import Header from './_components/Header'
import GitHubInfo from './_components/GitHubInfo'
import SettingsForm from './_components/SettingsForm'


const Page = () => {
  const { user, loading: userLoading } = useAuth()


  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }
  if (!user) {
    redirect('/')
    return null
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <GitHubInfo user={user} />
        <SettingsForm user={user}/>
      </div>
    </div>
  )
}

export default Page