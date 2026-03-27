import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './Work.module.css'

function WorkCard({ project, labels = {} }) {
  const href = project.type === 'opensource' ? project.github : '#showcase'
  const isExternal = project.type === 'opensource'

  return (
    <motion.div
      className={styles.card}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={href}
        className={styles.cardLink}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <div className={styles.thumbnail}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.thumbnailImg}
            loading="lazy"
          />
          <div className={styles.cardOverlay}>
            <span className={styles.viewLabel}>
              {labels[project.type] || labels.default || 'View Project'}
            </span>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <span className={styles.cardYear}>{project.year}</span>
          </div>
          <p className={styles.cardCategory}>{project.category}</p>
          {project.type === 'opensource' && project.language && (
            <div className={styles.repoMeta}>
              <span className={styles.language}>
                <span className={styles.langDot} style={{ backgroundColor: project.languageColor }} />
                {project.language}
              </span>
            </div>
          )}
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
          {project.tagline && (
            <p className={styles.description}>{project.tagline}</p>
          )}
        </div>
      </a>
    </motion.div>
  )
}

export default function Work({
  heading = 'Selected Work',
  projects = [],
  filterCategories = [],
  labels = {},
  background = 'shapes',
  backgroundSwitcher = false,
}) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, isVisible] = useScrollReveal(0.1)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.type === activeFilter)

  return (
    <section id="work" className={styles.section}>
      <SectionBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.inner} ref={ref}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.h2>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <WorkCard key={project.id} project={project} labels={labels} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
