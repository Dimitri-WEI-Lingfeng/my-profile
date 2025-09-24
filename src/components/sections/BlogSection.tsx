'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function BlogSection() {
  const t = useTranslations('blog')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  }

  // Placeholder blog posts - will be replaced with real data later
  const blogPosts = [
    
  ]

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="section-padding container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t('title')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Coming Soon Message */}
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('comingSoon')}
            </p>
          </motion.div>

          {/* Preview Blog Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                  {post.comingSoon && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="secondary" size="sm">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group opacity-50 cursor-not-allowed"
                      disabled
                    >
                      {t('readMore')}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
