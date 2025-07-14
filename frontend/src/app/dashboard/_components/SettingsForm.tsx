import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { useSettings } from '@/hooks/useSettings'

/**
 * SettingsFormProps interface
 * @param user - The user object
 */
interface SettingsFormProps {
  user: User | null
}


/**
 * SettingsForm component
 * @param user - The user object
 * @returns The SettingsForm component
 */
const SettingsForm = ({ user }: SettingsFormProps) => {
  const { settings, loading: settingsLoading, error: settingsError } = useSettings(user)
  const [reminder, setReminder] = useState(settings?.reminder || false)
  const [phoneNumber, setPhoneNumber] = useState(settings?.phone || '')

  // Add useEffect to update the form state when the settings change
  useEffect(() => {
    setReminder(settings?.reminder || false)
    setPhoneNumber(settings?.phone || '')
  }, [settings])

  // Add handleSave function
  const handleSave = async () => {
    const supabase = createClient()
    try {
      if (!user) {
        console.error('User not found')
        return
      }

      const { error } = await supabase
        .from('settings')
        .update({ phone: phoneNumber, reminder: reminder })
        .eq('user', user.id)

      if (error) {
        console.error(error)
      } else {
        console.log('Settings saved')
      }

    } catch (e) {
      console.error(e)
    }
  }

  // Add loading state
  if (settingsLoading) {
    return <div>Loading...</div>
  }

  // Add error state
  if (settingsError) {
    return <div>Error loading settings</div>
  }

  // Add form state
  return (
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
            className={phoneNumber ? 'border-red-500' : ''}
          />
          {phoneNumber && (
            <p className="text-red-500 text-sm">{phoneNumber}</p>
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
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default SettingsForm