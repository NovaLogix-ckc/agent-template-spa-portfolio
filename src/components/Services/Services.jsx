import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './Services.module.css'

export default function Services({
  heading = 'What We Do',
  items = [],
  background = 'grey',
  backgroundSwitcher = false,
}) {
  const [ref, isVisible] = useScrollReveal(0.15)

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="services" className={styles.section}>
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
          className={styles.grid}
          variants={container}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {items.map((service) => (
            <motion.div key={service.number} className={styles.card} variants={item}>
              <span className={styles.number}>{service.number}</span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
