import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Team.module.css'

export default function Team({ heading = 'The Team', members = [] }) {
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
    <section id="team" className={styles.section}>
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
          {members.map((member) => (
            <motion.div key={member.name} className={styles.card} variants={item}>
              <div className={styles.portrait} style={{ backgroundColor: member.color }}>
                <span className={styles.initials}>{member.initials}</span>
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
