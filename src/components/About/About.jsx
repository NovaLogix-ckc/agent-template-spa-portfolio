import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './About.module.css'

export default function About({
  heading = 'About',
  photoUrl = '',
  photoAlt = '',
  quote = '',
  paragraphs = [],
  stats = [],
  background = 'black',
  backgroundSwitcher = false,
}) {
  const [ref, isVisible] = useScrollReveal(0.15)

  return (
    <section id="about" className={styles.section}>
      <SectionBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.inner} ref={ref}>
        <div className={styles.columns}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.photoWrapper}>
              <img
                src={photoUrl}
                alt={photoAlt}
                className={styles.photo}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.accentLine} />
            <h2 className={styles.heading}>{heading}</h2>
            <blockquote className={styles.quote}>
              {quote}
            </blockquote>
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </motion.div>
        </div>

        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
