'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function SkillsSection() {
  const t = useTranslations('skills')

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

  const skillCategories = [
    {
      category: t('categories.llm'),
      skills: t('stacks.llm').split(', '),
      color: 'default' as const,
    },
    {
      category: t('categories.agent'),
      skills: t('stacks.agent').split(', '),
      color: 'secondary' as const,
    },
    {
      category: t('categories.backend'),
      skills: t('stacks.backend').split(', '),
      color: 'success' as const,
    },
    {
      category: t('categories.frontend'),
      skills: t('stacks.frontend').split(', '),
      color: 'warning' as const,
    },
    {
      category: t('categories.testing'),
      skills: t('stacks.testing').split(', '),
      color: 'error' as const,
    },
    {
      category: t('categories.others'),
      skills: t('stacks.others').split(', '),
      color: 'outline' as const,
    },
  ]

  return (
    <section id="skills" className="py-20">
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

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1 + skillIndex * 0.05 
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge variant={category.color} size="sm">
                            {skill.trim()}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
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
