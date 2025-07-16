'use client'
import React, { useState } from 'react'
import Image from 'next/image'
//@ts-expect-error - useAuth is not defined
import { useAuth } from '@/hooks/useAuth'
import '@/styles/dashboard.scss'
import { PatternFormat } from 'react-number-format'

const Dashboard = () => {
  const { user, loading: userLoading, signOut } = useAuth()
  const [reminder, setReminder] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  if (userLoading || !user) {
    return (
      <div className="dashboard__loading">
        <div>Loading...</div>
      </div>
    )
  }

  const handleReminderToggle = () => {
    setReminder(!reminder)
  }

  const handleSave = () => {
    console.log('Save clicked')
  }

  const handleSignOut = () => {
    signOut()   
  }

  return (
    <div className="dashboard">
      <div className="dashboard__settings-container">
        <div className="dashboard__settings-content">

          {/* Phone Input */}
          <div className="dashboard__phone-wrapper">
            <div className="dashboard__phone-label">Phone</div>
              <PatternFormat
                format="(###) ###-####"
                allowEmptyFormatting mask="_"
                value={phoneNumber} 
                onValueChange={(values) => setPhoneNumber(values.value)}
                className="dashboard__phone-input"
              />
          </div>

          {/* Reminder Toggle */}
          <div className="dashboard__reminder-wrapper">
            <div className="dashboard__reminder-label">Reminder</div>
            <div 
              className={`dashboard__reminder-toggle ${reminder ? 'dashboard__reminder-toggle--checked' : ''}`}
              onClick={handleReminderToggle}
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="dashboard__save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* GitHub Info */}
      <div className="dashboard__github-info">
        {user.user_metadata?.avatar_url && (
          <Image
            src={user.user_metadata.avatar_url}
            alt="GitHub Avatar"
            width={200}
            height={200}
            className="dashboard__github-avatar"
          />
        )}
        <div className="dashboard__github-username">
          {user.user_metadata?.github ?? user.user_metadata?.user_name}
        </div> 
      </div> 

      <button className="dashboard__sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default Dashboard