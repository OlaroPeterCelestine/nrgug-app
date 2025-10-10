'use client'

import { usePlayer } from '@/contexts/PlayerContext'
import BottomStickyPlayer from './BottomStickyPlayer'

export default function PlayerWrapper() {
  return (
    <BottomStickyPlayer
      isVisible={true}
    />
  )
}
