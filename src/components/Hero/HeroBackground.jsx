import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ParticleNetwork from './ParticleNetwork'
import AuroraWaves from './AuroraWaves'
import GravitationalOrbs from './GravitationalOrbs'
import FireEmbers from './FireEmbers'
import styles from './HeroBackground.module.css'

const BACKGROUNDS = {
  particles: { component: ParticleNetwork, label: 'Particles', icon: '◆' },
  aurora: { component: AuroraWaves, label: 'Aurora', icon: '≋' },
  orbs: { component: GravitationalOrbs, label: 'Orbs', icon: '●' },
  embers: { component: FireEmbers, label: 'Embers', icon: '🔥' },
}

export default function HeroBackground({
  background = 'particles',
  backgroundSwitcher = false,
}) {
  const shouldReduceMotion = useReducedMotion()
  const [activeKey, setActiveKey] = useState(background)

  if (shouldReduceMotion) return null

  const ActiveComponent = BACKGROUNDS[activeKey]?.component ?? ParticleNetwork

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.canvasWrapper}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      {backgroundSwitcher && (
        <div className={styles.switcher} role="radiogroup" aria-label="Background animation">
          {Object.entries(BACKGROUNDS).map(([key, { label, icon }]) => (
            <button
              key={key}
              className={`${styles.switcherBtn} ${activeKey === key ? styles.active : ''}`}
              onClick={() => setActiveKey(key)}
              aria-checked={activeKey === key}
              role="radio"
              title={label}
            >
              <span className={styles.switcherIcon}>{icon}</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
