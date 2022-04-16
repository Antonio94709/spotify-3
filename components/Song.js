import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songatom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../libs/time'

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrenttrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsplaying] = useRecoilState(isPlayingState)

    const playSong = () => {
        setCurrenttrackId(track.track.id)
        setIsplaying(true)
        spotifyApi.play({
            uris: [track.track.uri],
        })
    }
    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 rounded-lg cursor-pointer hover:bg-gray-900' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-60 truncate text-white' >{track.track.name}</p>
                    <p className='w-40'>{track.track.artists[0].name}</p>
                </div>

            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-40 hidden md:inline'>{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song