import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import videos from '../data/videos.json'

const DisplayScreen = () => {
    const [currentVideoId, setCurrentVideoId] = useState(null)

    const videoRef = useRef()

    useEffect(() => {
        const socket = io('http://localhost:3001')

        socket.on('play', () => {
            videoRef.current.play()
        })

        socket.on('pause', () => {
            videoRef.current.pause()
        })

        socket.on('seek', (msg) => {
            videoRef.current.currentTime = msg
        })

        socket.on('select video', (msg) => {
            setCurrentVideoId(msg)
        })

        socket.on('close video', () => {
            setCurrentVideoId(null)
        })
    }, [])

    return (
        <div className='display-screen'>
            {currentVideoId !== null ? (
                <video preload='auto' playsInline poster={`/thumbnails/${videos[currentVideoId - 1].thumbnail}`} ref={videoRef}>
                    <source src={`/videos/${videos[currentVideoId - 1].filename}`} type='video/mp4' />
                </video>
            ) : (
                <Video />
            )}
        </div>
    )
}

export default DisplayScreen

const Video = () => (
    <video loop playsInline autoPlay muted>
        <source src={`/videos/screensaver.mp4`} type='video/mp4' />
    </video>
)
