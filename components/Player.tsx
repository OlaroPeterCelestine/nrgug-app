'use client'

import { useState, useRef, useEffect } from 'react'

interface PlayerProps {
  id: string
  type: 'listen' | 'watch'
  removePlayer: (id: string) => void
}

export default function Player({ id, type, removePlayer }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState({ x: 200, y: 200 })
  const [size, setSize] = useState({ width: 280, height: 320 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      }
      if (isResizing) {
        setSize({
          width: Math.max(200, resizeStart.width + e.clientX - resizeStart.x),
          height: Math.max(150, resizeStart.height + e.clientY - resizeStart.y)
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, resizeStart])

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    })
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    removePlayer(id)
  }

  if (type === 'listen') {
    return (
      <div
        ref={playerRef}
        className="absolute bg-gray-800 rounded-lg shadow-2xl flex flex-col pointer-events-auto border border-gray-700 overflow-hidden noselect"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          minWidth: 280,
          minHeight: 320
        }}
      >
        <div
          className="bg-gray-700 p-2 flex justify-between items-center cursor-move rounded-t-lg"
          onMouseDown={handleDragStart}
        >
          <span className="font-semibold text-sm">Audio</span>
          <button
            className="close-btn text-white hover:text-red-500 text-xl"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div
          className="flex-grow relative bg-cover bg-center"
          style={{
            backgroundImage: "url('https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
            <h3 className="text-white font-bold text-lg text-center">Live Radio Show</h3>
            <p className="text-gray-300 text-sm mb-4">Playing NRG Live Stream</p>
            <button
              className="play-pause-btn w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
              onClick={togglePlayPause}
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl ${!isPlaying ? 'pl-1' : ''}`}></i>
            </button>
          </div>
        </div>
        <audio
          ref={audioRef}
          src="https://dc4.serverse.com/proxy/nrgugstream/stream"
          preload="none"
        />
        <div
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeStart}
        ></div>
      </div>
    )
  }

  return (
    <div
      ref={playerRef}
      className="absolute bg-gray-800 rounded-lg shadow-2xl flex flex-col pointer-events-auto border border-gray-700 overflow-hidden noselect"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        minWidth: 320,
        minHeight: 200
      }}
    >
      <div
        className="bg-gray-700 p-2 flex justify-between items-center cursor-move rounded-t-lg"
        onMouseDown={handleDragStart}
      >
        <span className="font-semibold text-sm">Video</span>
        <button
          className="close-btn text-white hover:text-red-500 text-xl"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
      <div className="flex-grow relative">
        <iframe
          src="https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html"
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div
        className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={handleResizeStart}
      ></div>
    </div>
  )
}
