import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchCircleIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"

const Sidebar = () => {
    const { data: session, status } = useSession()
console.log(session);
   
    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>

                    <p>Log out</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="w-5 h-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="w-5 h-5" />
                    <p>Your Library</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchCircleIcon className="w-5 h-5" />
                    <p>Search</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="w-5 h-5" />
                    <p>Create Playlist</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="w-5 h-5" />
                    <p>Your Episodes</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="w-5 h-5" />
                    <p>Liked Songs</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-500" />

                {/* playlists */}
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p><p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>

                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p><p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist name...
                </p>
            </div>
        </div>
    )
}

export default Sidebar