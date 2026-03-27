import { motion, useReducedMotion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import styles from './Hero.module.css'

export default function Hero({
  greeting = '',
  headlineLines = [],
  tagline = '',
  background = 'particles',
  backgroundSwitcher = false,
}) {
  const shouldReduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  }

  const lineVariant = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 50,
      clipPath: shouldReduceMotion ? 'inset(0)' : 'inset(0 0 100% 0)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className={styles.hero}>
      <HeroBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.arc} />
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.greeting} variants={fadeIn}>
          {greeting}
        </motion.p>

        {headlineLines.map((line, i) => (
          <div key={i} className={styles.lineWrapper}>
            <motion.h1
              className={`${styles.headline} ${styles.displayFont} ${line.accent ? styles.accent : ''}`}
              variants={lineVariant}
            >
              {line.text}
            </motion.h1>
          </div>
        ))}

        <motion.p className={styles.tagline} variants={fadeIn}>
          {tagline}
        </motion.p>

        <motion.div
          className={styles.scrollIndicator}
          variants={fadeIn}
        >
          <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
