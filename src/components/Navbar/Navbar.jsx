import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { useColorCycler } from '../../hooks/useColorCycler'
import { useTheme } from '../../hooks/useTheme'
import styles from './Navbar.module.css'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar({ logoText = '', navLinks = [], showContact = true, showColorCycler = false, showThemeToggle = false, contactButtonText = 'Contact' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTo = useSmoothScroll()
  const { currentColor, cycleColor } = useColorCycler()
  const { toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (id) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a
            href="#"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {logoText}
          </a>

          <div className={styles.links}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={styles.link}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
            {showContact && (
              <a
                href="#contact"
                className={styles.cta}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('contact')
                }}
              >
                {contactButtonText}
              </a>
            )}
            {showColorCycler && (
              <button
                className={styles.colorCycler}
                onClick={cycleColor}
                aria-label="Cycle theme color"
                title="Cycle theme color"
              >
                <span
                  className={styles.colorSwatch}
                  style={{ backgroundColor: currentColor }}
                />
              </button>
            )}
            {showThemeToggle && (
              <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayContent}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={styles.overlayLink}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.id)
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              {showContact && (
                <motion.a
                  href="#contact"
                  className={styles.overlayCta}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('contact')
                  }}
                >
                  {contactButtonText}
                </motion.a>
              )}
              {showColorCycler && (
                <motion.button
                  className={`${styles.colorCycler} ${styles.overlayColorCycler}`}
                  onClick={cycleColor}
                  aria-label="Cycle theme color"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: (navLinks.length + (showContact ? 1 : 0)) * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: currentColor }}
                  />
                </motion.button>
              )}
              {showThemeToggle && (
                <motion.button
                  className={`${styles.themeToggle} ${styles.overlayThemeToggle}`}
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: (navLinks.length + (showContact ? 1 : 0) + (showColorCycler ? 1 : 0)) * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
