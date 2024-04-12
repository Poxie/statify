import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TooltipProvider from '@/contexts/tooltip'
import PreviewProvider from '@/contexts/preview'
import AuthProvider from '@/contexts/auth'
import StoreProvider from '@/redux/StoreProvider'
import ModalProvider from '@/contexts/modal'
import MenuProvider from '@/contexts/menu'

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
        <StoreProvider>
          <AuthProvider>
            <MenuProvider>
              <TooltipProvider>
                <PreviewProvider>
                  <ModalProvider>
                    <Navbar />
                    {children}
                  </ModalProvider>
                </PreviewProvider>
              </TooltipProvider>
            </MenuProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
