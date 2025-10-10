'use client'

import { usePlayer } from '@/contexts/PlayerContext'
import BottomStickyPlayer from './BottomStickyPlayer'
import BottomVideoPlayer from './BottomVideoPlayer'

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
