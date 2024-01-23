import type { NextAuthOptions } from 'next-auth'
import StravaProvider from "next-auth/providers/strava";


export const options: NextAuthOptions = {
    providers: [
        StravaProvider({
        clientId: process.env.STRAVA_CLIENT_ID,
        clientSecret: process.env.STRAVA_CLIENT_SECRET,
        })
    ],
};