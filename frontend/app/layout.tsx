import './globals.css';
import { Inter } from 'next/font/google';
import SidebarComponent from '../components/sidebar/component'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarComponent />
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  )
}
