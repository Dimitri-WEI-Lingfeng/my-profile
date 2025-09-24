'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor, Globe } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { cn, scrollToSection } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Link } from '@/i18n/routing'

const sections = ['home', 'about', 'experience', 'projects', 'blog']

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const t = useTranslations('nav')
  const commonT = useTranslations('common')
  const locale = useLocale()
  const activeSection = useScrollSpy(sections)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: t('blog') },
  ]

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  }

  const ThemeIcon = themeIcons[theme]

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'glass-effect shadow-lg border-b border-white/10'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="section-padding container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            <button onClick={() => handleNavClick('home')}>
              WLF
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  activeSection === item.id
                    ? 'text-primary-600'
                    : 'text-gray-700 dark:text-gray-300'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Link href="/" locale={locale === 'en' ? 'zh' : 'en'}>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="h-4 w-4" />
                <span className="ml-1 text-xs">
                  {locale === 'en' ? '中' : 'EN'}
                </span>
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
              <ThemeIcon className="h-4 w-4" />
              <span className="sr-only">
                {resolvedTheme === 'light' ? commonT('darkMode') : commonT('lightMode')}
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">{commonT('menu')}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
              initial={{  height: 0 }}
              animate={{ height: 'auto' }}
              exit={{  height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2 border-t border-gray-200/50 dark:border-gray-700/50">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      activeSection === item.id
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    )}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={(direction) => ({
                      duration: 0.3,
                      delay: direction === 'enter' ? index * 0.1 : (navItems.length - 1 - index) * 0.1,
                      ease: "easeOut"
                    })}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

