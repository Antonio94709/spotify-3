import { getProviders , signIn } from "next-auth/react"
import Image from "next/image"

const login = ({ providers }) => { 
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png" alt="logo"/>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mt-3">
          <button className="bg-green-500 text-white rounded-full p-4" onClick={() => signIn(provider.id, { callbackUrl: "/"})}>
            login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}
// 1:34