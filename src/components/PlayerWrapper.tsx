'use client'

import { usePlayer } from '@/contexts/PlayerContext'
import BottomStickyPlayer from './BottomStickyPlayer'

export default function PlayerWrapper() {
  const { isPlayerVisible, shouldStartPlaying, resetStartPlaying } = usePlayer()
  
  const handlePlaybackStarted = () => {
    resetStartPlaying()
  }
  
  return (
    <BottomStickyPlayer
      isVisible={isPlayerVisible}
      shouldStartPlaying={shouldStartPlaying}
      onPlaybackStarted={handlePlaybackStarted}
    />
  )
}
