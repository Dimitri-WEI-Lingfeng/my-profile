'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function ProjectsSection() {
  const t = useTranslations('projects')

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

  const projects = t.raw('list')

  const getProjectColor = (index: number) => {
    const colors = ['default', 'secondary', 'success', 'warning', 'error', 'outline'] as const
    return colors[index % colors.length]
  }

  return (
    <section id="projects" className="py-20">
      <div className="section-padding container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project: { period: string; title: string; role: string; description: string }, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                      {/* Project Info */}
                      <div className="flex-1">
                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant={getProjectColor(index)} size="sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              {project.period}
                            </Badge>
                            <Badge variant="outline" size="sm">
                              <User className="h-3 w-3 mr-1" />
                              {project.role}
                            </Badge>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                           {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {project.title}
                            </a> : project.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Visual/Icon */}
                      {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-6 lg:mt-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <ExternalLink className="h-8 w-8 text-white" />
                        </div>
                      </a>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-6">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <motion.div
                          className="bg-primary-500 h-1 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true, amount: 0.1 }}
                        />
                      </div>
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
