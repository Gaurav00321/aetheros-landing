import { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'AetherOS - The Conscious AI Operating System',
  description: 'Experience AetherOS, the next evolution in operating systems. An AI-native OS that learns, adapts, and thinks with you.',
  keywords: 'AetherOS, AI Operating System, Neural Shell, Adaptive OS, AI-native OS',
  openGraph: {
    title: 'AetherOS - The Conscious AI Operating System',
    description: 'Experience AetherOS, the next evolution in operating systems. An AI-native OS that learns, adapts, and thinks with you.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AetherOS - The Conscious AI Operating System',
    description: 'Experience AetherOS, the next evolution in operating systems. An AI-native OS that learns, adapts, and thinks with you.',
  },
  icons: {
    icon: '/aether-logo.svg',
    apple: '/aether-logo.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="aetheros-theme"
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
