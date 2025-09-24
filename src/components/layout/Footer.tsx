'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Dimitri-WEI-Lingfeng',
      label: 'GitHub'
    },
    {
      icon: Mail,
      href: 'mailto:dimitri.wei.lingfeng@gmail.com',
      label: 'Email'
    }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="section-padding container-max">
        <div className="py-12">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center justify-center p-3 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" />
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('copyright')}
              </p>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                <span>{t('builtWith')}</span>
                <Heart className="h-3 w-3 text-red-500 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
