import { useState } from "react"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState } from "../atoms/songatom"
import useSpotify from "./useSpotify"


const useSongInfo = () => {
    const spotifyApi = useSpotify()
    const [currentTrack,setCurrenttrack] = useRecoilState(currentTrackIdState) 
    const [songInfo, setSongInfo] = useState(null)
useEffect(() => {
    const fetchSongInfo = async () => {
if (currentTrack) {
    const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrack}`,{
            headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
        }
    ).then(res => res.json())
    setSongInfo(trackInfo)
}
    }
    fetchSongInfo()
},[currentTrack, spotifyApi])


  return songInfo
}

export default useSongInfo