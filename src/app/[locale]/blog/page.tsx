'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'

export default function BlogPage() {
  const t = useTranslations('blog')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="section-padding container-max">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">{t('title')}</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                {t('comingSoon')}
              </p>
              
              <Link href="/">
                <Button variant="outline" size="lg" className="group">
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  {t('backToBlog')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

