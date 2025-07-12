import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'
import { UserSettings } from '@/types/settings'
import { User } from '@supabase/supabase-js'
import React, { useState } from 'react'

interface SettingsFormProps {
  settings: UserSettings | null
  user: User | null
}

const SettingsForm = ({ settings, user }: SettingsFormProps) => {
  const [reminder, setReminder] = useState(settings?.reminder || false)
  const [phoneNumber, setPhoneNumber] = useState(settings?.phone || '')

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