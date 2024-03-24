import Navbar from '@/components/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UploadContextProvider} from "@/contexts/UploadContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cinespace',
  description: 'Cinema for everyone in occupying space',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        fontSize:"2vw"
      }} className={inter.className}>
        <Sidebar />
        {children}</body>
    </html>
  )
}
