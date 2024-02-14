"use client"

// I was having issues with the session not working effectively, so I decided to wrap the whole website in a session provider. This allows me to access the session from anywhere in the website.
// Solution from: https://stackoverflow.com/questions/75902311/next-js-13-and-next-auth-issues-with-usesession-and-sessionprovider
import {SessionProvider} from "next-auth/react"

export default function Provider({children, session}) {

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}