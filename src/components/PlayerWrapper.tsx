'use client'

import { usePlayer } from '@/contexts/PlayerContext'
import BottomStickyPlayer from './BottomStickyPlayer'

export default function PlayerWrapper() {
  const { isPlayerVisible } = usePlayer()
  
  return (
    <BottomStickyPlayer
      isVisible={isPlayerVisible}
    />
  )
}
