'use client'

import { usePlayer } from '@/contexts/PlayerContext'
import BottomStickyPlayer from './BottomStickyPlayer'
import BottomVideoPlayer from './BottomVideoPlayer'
import { useEffect } from 'react'

export default function PlayerWrapper() {
  const { 
    isPlayerVisible, 
    shouldStartPlaying, 
    resetStartPlaying,
    isVideoPlayerVisible,
    shouldStartVideoPlaying,
    resetStartVideoPlaying
  } = usePlayer()
  
  const handlePlaybackStarted = () => {
    resetStartPlaying()
  }

  const handleVideoPlaybackStarted = () => {
    resetStartVideoPlaying()
  }

  // Manage body class for sticky players
  useEffect(() => {
    const hasStickyPlayers = isPlayerVisible || isVideoPlayerVisible
    
    if (hasStickyPlayers) {
      document.body.classList.add('has-sticky-players')
    } else {
      document.body.classList.remove('has-sticky-players')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('has-sticky-players')
    }
  }, [isPlayerVisible, isVideoPlayerVisible])
  
  return (
    <>
      <BottomStickyPlayer
        isVisible={isPlayerVisible}
        shouldStartPlaying={shouldStartPlaying}
        onPlaybackStarted={handlePlaybackStarted}
      />
      <BottomVideoPlayer
        isVisible={isVideoPlayerVisible}
        shouldStartPlaying={shouldStartVideoPlaying}
        onPlaybackStarted={handleVideoPlaybackStarted}
      />
    </>
  )
}
