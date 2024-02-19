import { Inter } from 'next/font/google'
import './ui/globals.css'
import Provider from '../context/Provider'

// Website title, description and icon set
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'ChainSafe | Bicycle Maintenance Tracker',
  description: 'Bicycle Maintenance Tracker With Dashboard',
  icons: {
    icon: 'logo.ico',
  }
}

//Wrapped website in provider to make sure that session is available throughout the website
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  )
}