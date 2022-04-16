import { signOut, useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { shuffle } from "lodash"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistAtomState, playlistIdState } from "../atoms/playlistatom"
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"

const colors = [
  "from-red-500",
  "from-pink-500",
  "from-blue-500",
  "from-yellow-500",
  "from-purple-500",
  "from-green-500",
  "from-indigo-500",
]

const Center = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlists, setPlaylists] = useRecoilState(playlistAtomState)

  useEffect(() => {
    setColor(shuffle(colors).pop(playlistId))
  }, [])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylists(data.body)
    }).catch((err) => console.log("something wrong", err))
  }, [spotifyApi, playlistId])

console.log("list",playlists);

  return (
    <div className="text-white flex-grow h-screen overflow-y-scroll scrollbar-hide">

      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2" onClick={() => signOut()}>
          <img src={session?.user.image} alt='' className=" rounded-full w-10 h-10" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black      ${color} h-80 text-white p-8`}>
        
        <img className="h-44 w-44 shadow-2xl" src={playlists?.images?.[0]?.url} alt=""/>
       <div>
         <p className="uppercase">Playlist</p>
         <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlists?.name}</h1>
       </div>
      </section>
      <div>
        <Songs/>
      </div>
    </div>
  )
}

export default Center