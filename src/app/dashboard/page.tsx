'use client'
import { redirect } from 'next/navigation'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'
import Header from './_components/Header'
import GitHubInfo from './_components/GitHubInfo'
import SettingsForm from './_components/SettingsForm'


const Page = () => {
  const { user, loading: userLoading } = useAuth()
  const { settings, loading: settingsLoading, error: settingsError } = useSettings(user)


  if (userLoading || settingsLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (settingsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error loading settings: {settingsError}</div>
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
        <SettingsForm settings={settings} user={user} />
      </div>
    </div>
  )
}

export default Page