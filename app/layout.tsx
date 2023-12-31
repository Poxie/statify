import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TooltipProvider from '@/contexts/tooltip'
import PreviewProvider from '@/contexts/preview'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Statify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <PreviewProvider>
            <Navbar />
            {children}
          </PreviewProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
