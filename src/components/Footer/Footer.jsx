import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import styles from './Footer.module.css'

export default function Footer({
  logoText = '',
  copyright = '',
  rightsText = 'All rights reserved.',
  backToTopText = 'Back to top',
  socialLinks = [],
  navLinks = [],
}) {
  const scrollTo = useSmoothScroll()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{logoText}</span>
          </div>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.socialLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            &copy; {new Date().getFullYear()} {copyright}. {rightsText}
          </span>
          <a
            href="#"
            className={styles.backToTop}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {backToTopText}
          </a>
        </div>

        <div className={styles.poweredBy}>
          <a href="https://novalogix.au" target="_blank" rel="noopener noreferrer">
            Powered by Novalogix
          </a>
        </div>
      </div>
    </footer>
  )
}
