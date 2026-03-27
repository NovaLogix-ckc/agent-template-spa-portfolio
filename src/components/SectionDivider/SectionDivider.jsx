import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './SectionDivider.module.css'

export default function SectionDivider() {
  const [ref, isVisible] = useScrollReveal(0.5)

  return (
    <div className={styles.wrapper} ref={ref}>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
