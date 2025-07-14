import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Header = () => {
  const { signOut } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full p-4">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={() => signOut()}>Sign out</Button>
        </div> 
        <hr className="w-full"></hr>
    </div>
  )
}

export default Header