import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import ClientProviders from "@/src/components/SessionWrapper"
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import './globals.css'

export const metadata: Metadata = {
  title: 'GS Tech Info - Premium Developer Learning Platform',
  description: 'Master advanced tech concepts with in-depth articles, guides, and resources crafted for developers who want to go deep.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gs-tech-info.com',
    title: 'GS Tech Info - Premium Developer Learning Platform',
    description: 'Master advanced tech concepts with in-depth articles, guides, and resources.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ClientProviders session={session}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ClientProviders>
      </body>
    </html>
  )
}
