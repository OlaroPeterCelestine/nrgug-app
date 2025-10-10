'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PlayerContextType {
  isPlayerVisible: boolean
  showPlayer: () => void
  hidePlayer: () => void
  minimizePlayer: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)

  const showPlayer = () => setIsPlayerVisible(true)
  const hidePlayer = () => setIsPlayerVisible(false)
  const minimizePlayer = () => setIsPlayerVisible(false)

  return (
    <PlayerContext.Provider value={{
      isPlayerVisible,
      showPlayer,
      hidePlayer,
      minimizePlayer
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}


