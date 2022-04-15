import { useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/outline"

const Center = () => {
    const { data: session } = useSession()
  return (
    <div className="text-white flex-grow">
        
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2">
                <img src={session?.user.image} alt='' className=" rounded-full w-10 h-10"/>
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-purple-900 h-80 text-white p-8`}>
          <h1>bro</h1>
          {/* <img src="" alt=""></img> */}
        </section>
    </div>
  )
}

export default Center