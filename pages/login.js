import { getProviders , signIn } from "next-auth/react"
import Image from "next/image"

const login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image src="/image/spotify-2.png" width="100" height="100" />
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