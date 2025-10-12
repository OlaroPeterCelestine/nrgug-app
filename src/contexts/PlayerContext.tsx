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
  isVideoPlayerVisible: boolean
  showVideoPlayer: () => void
  hideVideoPlayer: () => void
  startVideoPlaying: () => void
  shouldStartVideoPlaying: boolean
  resetStartVideoPlaying: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [shouldStartPlaying, setShouldStartPlaying] = useState(false)
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState(false)
  const [shouldStartVideoPlaying, setShouldStartVideoPlaying] = useState(false)

  const showPlayer = () => setIsPlayerVisible(true)
  const hidePlayer = () => setIsPlayerVisible(false)
  const minimizePlayer = () => setIsPlayerVisible(false)
  const startPlaying = () => {
    setShouldStartPlaying(true)
    setIsPlayerVisible(true)
  }
  const resetStartPlaying = () => setShouldStartPlaying(false)

  const showVideoPlayer = () => setIsVideoPlayerVisible(true)
  const hideVideoPlayer = () => setIsVideoPlayerVisible(false)
  const startVideoPlaying = () => {
    setShouldStartVideoPlaying(true)
    setIsVideoPlayerVisible(true)
  }
  const resetStartVideoPlaying = () => setShouldStartVideoPlaying(false)

  return (
    <PlayerContext.Provider value={{
      isPlayerVisible,
      showPlayer,
      hidePlayer,
      minimizePlayer,
      startPlaying,
      shouldStartPlaying,
      resetStartPlaying,
      isVideoPlayerVisible,
      showVideoPlayer,
      hideVideoPlayer,
      startVideoPlaying,
      shouldStartVideoPlaying,
      resetStartVideoPlaying
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




