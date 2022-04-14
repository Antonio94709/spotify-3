import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../libs/spotify"


async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.RefreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESH TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,

      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account, user }) {

      // inital login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          // hanling the expiry time
        }
      }
      //retunr prev token if access not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING TOKEN VALID");
        return token
      }
      // "oh no , access token expired.". 
      // me: NO problem bro , i got you
      console.log("ACCESS TOKEN EXPIRED, REFRESHING");
      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      sessionuser.username = token.username;

      return session
    }
  }
})