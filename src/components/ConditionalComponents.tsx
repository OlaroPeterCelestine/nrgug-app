'use client'

import { usePathname } from 'next/navigation'
import PlayerWrapper from './PlayerWrapper'
import WhatsAppButton from './WhatsAppButton'

export default function ConditionalComponents() {
  const pathname = usePathname()
  
  // Hide PlayerWrapper and WhatsAppButton on video page
  if (pathname === '/video') {
    return null
  }
  
  return (
    <>
      <PlayerWrapper />
      <WhatsAppButton />
    </>
  )
}
