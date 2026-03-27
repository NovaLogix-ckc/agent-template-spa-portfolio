import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './Contact.module.css'

export default function Contact({
  heading = 'Have a project in mind?\nLet\u2019s talk.',
  ctaLabel = 'Get in touch',
  ctaUrl = '#',
  ctaExternal = false,
  background = 'grid',
  backgroundSwitcher = false,
}) {
  const [ref, isVisible] = useScrollReveal(0.15)

  const headingParts = heading.split('\n')

  return (
    <section id="contact" className={styles.section}>
      <SectionBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.inner} ref={ref}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {headingParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {part}
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={ctaUrl}
            className={styles.linkedinLink}
            {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
