'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PlayerContextType {
  isPlayerVisible: boolean
  showPlayer: () => void
  hidePlayer: () => void
  minimizePlayer: () => void
  startPlaying: () => void
  shouldStartPlaying: boolean
  resetStartPlaying: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [shouldStartPlaying, setShouldStartPlaying] = useState(false)

  const showPlayer = () => setIsPlayerVisible(true)
  const hidePlayer = () => setIsPlayerVisible(false)
  const minimizePlayer = () => setIsPlayerVisible(false)
  const startPlaying = () => {
    setShouldStartPlaying(true)
    setIsPlayerVisible(true)
  }
  const resetStartPlaying = () => setShouldStartPlaying(false)

  return (
    <PlayerContext.Provider value={{
      isPlayerVisible,
      showPlayer,
      hidePlayer,
      minimizePlayer,
      startPlaying,
      shouldStartPlaying,
      resetStartPlaying
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




