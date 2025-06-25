import Footer from "@/components/sections/Footer"
import { useTheme } from "@/components/theme/use-theme"
import { ReactNode, useEffect } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')

    if (theme === 'dark') {
      root.classList.add('dark')
      body.classList.add('dark')
      body.style.backgroundColor = '#1E293B' // slate-800
      body.style.color = '#F1F5F9' // slate-100
    } else {
      root.classList.add('light')
      body.classList.add('light')
      body.style.backgroundColor = '#FFFFFF'
      body.style.color = '#334155' // slate-700
    }
  }, [theme])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      {children}
      <Footer />
    </div>
  )
}

export default Layout