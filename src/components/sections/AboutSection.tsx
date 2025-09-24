'use client'

import { motion } from 'framer-motion'
import { MapPin, Heart, Mail, Guitar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/Card'
import TriathlonSvg from '@/assets/svgs/triathlon.svg'


export function AboutSection() {
  const t = useTranslations('about')

  // 解析兴趣并返回对应的图标
  const getInterestIcons = (interestsText: string) => {
    const icons = []
    if (interestsText.includes('吉他') || interestsText.includes('Guitar')) {
      icons.push({ icon: Guitar, label: t('guitar') })
    }
    if (interestsText.includes('铁人') || interestsText.includes('Ironman')) {
      icons.push({ icon: TriathlonSvg, label: t('triathlon') })
    }
    return icons
  }

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

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.currentCity'),
      value: t('details.currentCity'),
    },
    {
      icon: Heart,
      label: t('contact.interests'),
      value: t('details.interests'),
      isInterests: true, // 标记这是兴趣项
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: t('details.email'),
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
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

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Introduction */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                    {t('introTitle')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {t('intro')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                    {t('contact.title')}
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.label}
                          </p>
                          {item.isInterests ? (
                            <div className="flex items-center space-x-3 mt-1">
                              {getInterestIcons(item.value).map((interest, idx) => (
                                <div key={idx} className="flex items-center space-x-1">
                                  <interest.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {interest.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
