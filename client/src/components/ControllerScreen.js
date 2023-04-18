import { useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import videos from '../data/videos.json'

import bg from '../img/bg.png'
import playIcon from './icons/play.svg'
import pauseIcon from './icons/pause.svg'

const ControllerScreen = () => {
    const [videoIsOpen, setVideoIsOpen] = useState(false)
    const [currentVideoId, setCurrentVideoId] = useState()
    const [videoPaused, setVideoPaused] = useState(true)

    const videoRef = useRef()
    const seekerRef = useRef()
    const socket = io(`http://${process.env.REACT_APP_LOCAL_SERVER_IP}:3001`)

    const handlePlay = () => {
        socket.emit('seek', videoRef.current.currentTime)
        socket.emit('play')
    }

    const handlePause = () => {
        socket.emit('pause')
        socket.emit('seek', videoRef.current.currentTime)
    }

    const handleSeeked = (e) => {
        socket.emit('seek', videoRef.current.currentTime)
        return
    }

    const handleEnd = () => {
        setVideoPaused(true)
        closeVideo()
    }

    const selectVideo = (id) => {
        socket.emit('select video', id)
        setCurrentVideoId(id)
        setVideoIsOpen(true)
        setVideoPaused(true)
    }

    const closeVideo = () => {
        socket.emit('close video')
        setCurrentVideoId(null)
        setVideoIsOpen(false)
        // Close video and send that action to sockets
    }

    // Sends seeker bar time to video
    const controlSeek = (e) => {
        videoRef.current.currentTime = (videoRef.current.duration / 100) * Number(e.target.value)
    }

    // Sends video time to seeker bar
    const videoTimeUpdate = () => {
        seekerRef.current.value = (videoRef.current.currentTime / videoRef.current.duration) * 100
    }

    useEffect(() => {
        if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
            if (videoPaused) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
        }
    }, [videoRef, videoPaused])

    useEffect(() => {
        if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
            seekerRef.current.value = (videoRef.current.currentTime / videoRef.current.duration) * 100
        }
    }, [videoRef.current?.currentTime])

    // Reset the seek controller to 0 when a video is opened.
    useEffect(() => {
        if (seekerRef.current) {
            seekerRef.current.value = 0
        }
    }, [videoIsOpen])

    return (
        <div className='controller-screen' style={{ backgroundImage: `url(${bg})` }}>
            <div className='header'>
                <img className='logo' src='/logo.svg' alt='Spirit Aerosystems' />
            </div>
            <div className='content'>
                <h1>Select a video to play</h1>
                {videos.map((video) => (
                    <div key={video.title} className='thumbnail'>
                        <img src={`/thumbnails/${video.thumbnail}`} onClick={() => selectVideo(video.id)} alt={video.title} />
                    </div>
                ))}
            </div>
            {videoIsOpen && (
                <div className='video-background'>
                    <div className='icons'>
                        <img src='/close-icon.svg' onClick={() => closeVideo()} alt='close' />
                    </div>
                    <div className='video-container'>
                        <video onEnded={() => handleEnd()} onTimeUpdate={() => videoTimeUpdate()} poster={`/thumbnails/${videos[currentVideoId - 1].thumbnail}`} playsInline ref={videoRef} muted onPlay={() => handlePlay()} onPause={() => handlePause()} onSeeked={(e) => handleSeeked(e)} controlsList='nodownload noplaybackrate' disablePictureInPicture x-webkit-airplay='deny'>
                            <source src={`/videos/${videos[currentVideoId - 1].filename}`} type='video/mp4' />
                        </video>
                        <div className='controls'>
                            {videoPaused ? <img src={playIcon} onClick={() => setVideoPaused(false)} alt='play' /> : <img src={pauseIcon} onClick={() => setVideoPaused(true)} alt='pause' />}
                            <input style={{ width: '500px' }} onChange={(e) => controlSeek(e)} ref={seekerRef} type='range' min='0' max='100' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ControllerScreen
