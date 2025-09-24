'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/Card'

export function ExperienceSection() {
  const experienceT = useTranslations('experience')
  const educationT = useTranslations('education')

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

  const workExperience = [
    {
      period: experienceT('current.period'),
      company: experienceT('current.company'),
      position: experienceT('current.position'),
      current: true,
      url: experienceT('current.url'),
    },
    ...experienceT.raw('previous').map((exp: { period: string; company: string; position: string; url: string }) => ({
      period: exp.period,
      company: exp.company,
      position: exp.position,
      url: exp.url,
      current: false,
    })),
  ]

  const education = [
    {
      period: educationT('master.period'),
      school: educationT('master.school'),
      major: educationT('master.major'),
      description: educationT('master.description'),
    },
    {
      period: educationT('bachelor.period'),
      school: educationT('bachelor.school'),
      major: educationT('bachelor.major'),
      description: educationT('bachelor.description'),
    },
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/50">
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
              <span className="gradient-text">Experience & Education</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              My professional journey and academic background
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Work Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {experienceT('title')}
                </h3>
              </div>

              <div className="space-y-6">
                {workExperience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`relative ${exp.current ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}>
                      {exp.current && (
                        <div className="absolute -top-2 -right-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                              {exp.period}
                            </p>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {exp.position}
                            </h4>
                            {exp.url ? (
                              <p className="text-gray-600 dark:text-gray-400">
                                <a href={exp.url} target="_blank" rel="noopener noreferrer">
                                  {exp.company}
                                </a>
                              </p>) : (
                              <p className="text-gray-600 dark:text-gray-400">
                                {exp.company}
                              </p>
                            )}

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {educationT('title')}
                </h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-secondary-600 dark:text-secondary-400 font-medium mb-1">
                              {edu.period}
                            </p>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {edu.major}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              {edu.school}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {edu.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
