import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import FloatingShapes from '../FloatingShapes/FloatingShapes'
import AnimatedGrid from '../AnimatedGrid/AnimatedGrid'
import MeshGradient from './MeshGradient'
import WaveField from './WaveField'
import styles from './SectionBackground.module.css'

const BACKGROUNDS = {
  black:  { color: 'var(--color-bg)',          label: 'Black',  icon: '■' },
  grey:   { color: 'var(--color-bg-elevated)', label: 'Grey',   icon: '▦' },
  shapes: { component: FloatingShapes, label: 'Shapes', icon: '△' },
  grid:   { component: AnimatedGrid,   label: 'Grid',   icon: '⊞' },
  mesh:   { component: MeshGradient,   label: 'Mesh',   icon: '◎' },
  waves:  { component: WaveField,      label: 'Waves',  icon: '∿' },
}

export default function SectionBackground({
  background = 'shapes',
  backgroundSwitcher = false,
}) {
  const shouldReduceMotion = useReducedMotion()
  const [activeKey, setActiveKey] = useState(background)

  const entry = BACKGROUNDS[activeKey] ?? BACKGROUNDS.black
  const isSolid = !!entry.color
  const isAnimation = !!entry.component

  const showBackground = isSolid || (isAnimation && !shouldReduceMotion)

  return (
    <>
      <AnimatePresence mode="wait">
        {showBackground && (
          <motion.div
            key={activeKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.canvasWrapper}
            style={isSolid ? { backgroundColor: entry.color } : undefined}
          >
            {isAnimation && <entry.component />}
          </motion.div>
        )}
      </AnimatePresence>

      {backgroundSwitcher && (
        <div className={styles.switcher} role="radiogroup" aria-label="Section background">
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
