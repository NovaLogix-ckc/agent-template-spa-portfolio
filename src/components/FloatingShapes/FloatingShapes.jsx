import styles from './FloatingShapes.module.css'

export default function FloatingShapes() {
  return (
    <div className={styles.container}>
      <div className={`${styles.shape} ${styles.triangle}`} />
      <div className={`${styles.shape} ${styles.circle}`} />
      <div className={`${styles.shape} ${styles.square}`} />
      <div className={`${styles.shape} ${styles.ring}`} />
      <div className={`${styles.shape} ${styles.cross}`} />
    </div>
  )
}
