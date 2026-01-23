'use client'

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img 
            src={session.user.image} 
            alt={session.user.name || 'User'} 
            className="w-8 h-8 rounded-full border-2 border-cyan-500"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            {session.user.name || session.user.email}
          </span>
          <span className="text-xs text-gray-400">{session.user.email}</span>
        </div>
      </div>
      
      <Button
        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        variant="ghost"
        size="sm"
        className="hover:bg-red-500/10 hover:text-red-500"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
