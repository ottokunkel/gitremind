'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'

// Zod schema for validation
const settingsSchema = z.object({
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  reminder: z.boolean()
})

const Page = () => {
  const { user, loading: userLoading, signOut } = useAuth()
  const { settings, loading: settingsLoading, error: settingsError } = useSettings(user)
  const supabase = createClient()
  const [phoneNumber, setPhoneNumber] = useState(settings?.phone || '')
  const [reminder, setReminder] = useState(settings?.reminder || false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ phoneNumber?: string }>({})

  // Update form state when settings are loaded
  useEffect(() => {
    if (settings) {
      setPhoneNumber(settings.phone || '')
      setReminder(settings.reminder || false)
    }
  }, [settings])

  const handleSave = async () => {
    if (!user) return

    try {
      setSaving(true)
      setErrors({})

      // Validate with zod
      const validationResult = settingsSchema.safeParse({
        phoneNumber,
        reminder
      })

      if (!validationResult.success) {
        const fieldErrors: { phoneNumber?: string } = {}
        validationResult.error.issues.forEach((issue) => {
          if (issue.path[0] === 'phoneNumber') {
            fieldErrors.phoneNumber = issue.message
          }
        })
        setErrors(fieldErrors)
        return
      }

      // Save to database
      const { error } = await supabase
        .from('settings')
        .upsert({
          user: user.id,
          phone: phoneNumber,
          reminder: reminder,
        })

      if (error) {
        console.error('Error saving settings:', error)
        alert('Error saving settings. Please try again.')
      } else {
        alert('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

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

  // Extract GitHub specific data from user metadata
  const githubUsername = user.user_metadata?.user_name || user.user_metadata?.login
  const githubAvatar = user.user_metadata?.avatar_url

  return (
    <div className="flex flex-col">
      {/* Header: */}
      <div className="flex flex-col items-center justify-center gap-2 w-full p-4">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={signOut}>Sign out</Button>
        </div> 
        <hr className="w-full"></hr>
      </div>

      {/* Settings: */}
      <div className="flex flex-col items-center justify-center gap-2 w-full">

        {/* Account Info: */}
        <div className="flex flex-col items-center justify-center gap-2 w-full p-4">
          <h2 className="text-lg font-bold">Account Info</h2>
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

        {/* Settings */}
        <div className="flex flex-col items-center justify-center gap-2 w-full p-4">
          <h2 className="text-lg font-bold">Settings</h2>
          <hr className="w-full"></hr>

          <div className="flex flex-col items-center justify-center gap-8 w-1/2 border-2 border-gray-300 rounded-md p-4">
            {/* phone number */}
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <Input 
                placeholder="Phone Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            {/* reminder toggle */}
            <div className="flex flex-row items-center justify-between gap-2 w-full">
              <p>Reminder</p>
              <Switch 
                checked={reminder}
                onCheckedChange={setReminder}
              />
            </div>

            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page