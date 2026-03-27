import styles from './AnimatedGrid.module.css'

export default function AnimatedGrid() {
  return (
    <div className={styles.grid}>
      <div className={styles.gridLines} />
      <div className={styles.pulse} />
      <div className={styles.pulse2} />
    </div>
  )
}
