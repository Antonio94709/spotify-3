import { HeartIcon, VolumeOffIcon } from "@heroicons/react/outline"
import { RewindIcon, SwitchHorizontalIcon, FastForwardIcon, PauseIcon, ReplyIcon, VolumeUpIcon, PlayIcon } from "@heroicons/react/solid"
import { debounce } from "lodash"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songatom"
import useSongInfo from "../hooks/useSongInfo"
import useSpotify from "../hooks/useSpotify"


const Player = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrenttrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsplaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState()
    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now playing: ", data.body?.item);
                setCurrenttrackId(data.bodu?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then((data) => {

                    setIsplaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsplaying(false)
            } else {
                spotifyApi.play()
                setIsplaying(true)
            }
        })
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
fetchCurrentSong()
setVolume(50)
        }
    }, [currentTrackIdState, spotifyApi ,session])

useEffect(() => {
    if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume)
    }
}, [volume])

const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
        spotifyApi.setVolume(volume)
    }, 500)
)

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid-cols-3 grid text-xs md:text-base px-2 md:px-8">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0].url} alt="" />
                <div>
                    {songInfo?.name}
                    <p>{songInfo?.artists?.[0]?.name} </p>
                </div>
            </div>
            {/* center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="m-auto w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
                <RewindIcon className="m-auto w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="m-auto w-10 h-10 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />) : (
                    <PlayIcon onClick={handlePlayPause} className="m-auto w-10 h-10 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />

                )}
                <FastForwardIcon className="m-auto w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
                <ReplyIcon className="m-auto w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
            </div>
            {/* right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeOffIcon onClick={() => volume > 0 && setVolume(volume - 10)} className=" w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
                <input 
                type="range" 
                className="w-14 md:w-28" 
                value={volume} 
                onChange={(e) => setVolume(Number(e.target.value))} 
                min={0} 
                max={100} />
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className=" w-5 h-5 cursor-pointer hover:scale-125  transition-transform duration-100 ease-out" />
            </div>
        </div>
    )
}

export default Player