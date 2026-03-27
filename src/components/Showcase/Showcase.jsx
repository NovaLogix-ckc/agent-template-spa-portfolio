import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './Showcase.module.css'

function buildStatusConfig(statusLabels = {}) {
  return {
    live: { label: statusLabels.live || 'Live', className: styles.statusLive },
    beta: { label: statusLabels.beta || 'Beta', className: styles.statusBeta },
    experimental: { label: statusLabels.experimental || 'Experimental', className: styles.statusExperimental },
  }
}

function VideoEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false)

  if (!videoId) return null

  return (
    <div className={styles.videoArea} onClick={() => !playing && setPlaying(true)}>
      {playing ? (
        <iframe
          className={styles.videoIframe}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={`${title} demo video`}
            className={styles.videoThumbnail}
            loading="lazy"
          />
          <div className={styles.playButton}>
            <svg className={styles.playIcon} viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
              <path d="M19 16l14 8-14 8V16z" fill="currentColor" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

function ScreenshotGallery({ screenshots, screenshotsHeading = 'Screenshots' }) {
  if (!screenshots || screenshots.length === 0) return null

  return (
    <div className={styles.screenshotSection}>
      <p className={styles.screenshotLabel}>{screenshotsHeading}</p>
      <div className={styles.screenshotRow}>
        {screenshots.map((shot, i) => (
          <div key={i} className={styles.screenshotItem}>
            <img
              src={shot.src}
              alt={shot.alt}
              className={styles.screenshotImg}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectInfo({ project, labels = {}, statusLabels = {} }) {
  const statusConfig = buildStatusConfig(statusLabels)
  const status = statusConfig[project.status]

  return (
    <div className={styles.projectInfo}>
      <div className={styles.titleRow}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        {status && (
          <span className={`${styles.statusBadge} ${status.className}`}>
            {status.label}
          </span>
        )}
      </div>
      <p className={styles.projectSubtitle}>{project.subtitle}</p>
      <p className={styles.projectDescription}>{project.description}</p>

      <div className={styles.techStack}>
        {project.techStack.map((tech) => (
          <span key={tech} className={styles.techTag}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.actionLinks}>
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.715 6.542L3.343 7.914a3 3 0 104.243 4.243l1.828-1.829A3 3 0 008.586 5.5L8 6.086a1 1 0 00-.154.199 2 2 0 01.861 3.337L6.88 11.45a2 2 0 11-2.83-2.83l.793-.792a4.018 4.018 0 01-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 007.414 9.5l.775-.776a2 2 0 01-.896-3.346L9.12 3.55a2 2 0 112.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 10-4.243-4.243L6.586 4.672z" />
            </svg>
            {labels.live || 'Live'}
          </a>
        )}
        {project.links.appStore && (
          <a href={project.links.appStore} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 00-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43z" />
            </svg>
            {labels.appStore || 'App Store'}
          </a>
        )}
        {project.links.playStore && (
          <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96 2.694-1.586zm-3.595 2.116L7.583 8.68 1.03 14.928c.116.024.264.04.398-.006l9.2-4.432zM.4 1.141C.284 1.333.222 1.568.222 1.84v12.32c0 .18.032.348.083.498l6.553-6.33L.4 1.14zm.83-.74l6.413 5.963L10.627 3.51 1.518.083A.857.857 0 001.23.4z" />
            </svg>
            {labels.playStore || 'Play Store'}
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {labels.github || 'GitHub'}
          </a>
        )}
      </div>
    </div>
  )
}

function ShowcaseProject({ project, index, labels, statusLabels }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <motion.div
      ref={ref}
      className={styles.projectBlock}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.projectTop}>
        <VideoEmbed videoId={project.videoId} title={project.title} />
        <ProjectInfo project={project} labels={labels} statusLabels={statusLabels} />
      </div>
      <ScreenshotGallery screenshots={project.screenshots} screenshotsHeading={labels?.screenshotsHeading} />
    </motion.div>
  )
}

export default function Showcase({
  heading = 'Project Showcase',
  subtitle = 'A closer look at featured projects',
  projects = [],
  labels = {},
  statusLabels = {},
  background = 'shapes',
  backgroundSwitcher = false,
}) {
  const [headerRef, headerVisible] = useScrollReveal(0.1)

  return (
    <section id="showcase" className={styles.section}>
      <SectionBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.inner}>
        <motion.div
          className={styles.headerBlock}
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        <div className={styles.projectList}>
          {projects.map((project, i) => (
            <ShowcaseProject key={project.id} project={project} index={i} labels={labels} statusLabels={statusLabels} />
          ))}
        </div>
      </div>
    </section>
  )
}
