'use client'

import { motion } from 'framer-motion'
import { Download, Mail, ArrowDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/lib/utils'

export function HeroSection() {
  const t = useTranslations('hero')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pb-8 sm:pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-padding container-max">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mb-4"
            variants={itemVariants}
          >
            {t('greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text">{t('name')}</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
            title={t('description')}
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('about')}
              className="group"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              {t('cta')}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-gray-400 hover:text-primary-600 transition-colors group"
              animate={floatingAnimation}
            >
              <ArrowDown className="h-6 w-6 group-hover:animate-bounce" />
            </motion.button>
            <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
