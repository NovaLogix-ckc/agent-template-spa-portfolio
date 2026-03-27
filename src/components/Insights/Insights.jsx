import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionBackground from '../SectionBackground/SectionBackground'
import styles from './Insights.module.css'

function VideoCard({ video, index, isVisible }) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.videoCard}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.thumbnailWrapper}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className={styles.thumbnailImg}
          loading="lazy"
        />
        <svg className={styles.playIcon} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
          <path d="M19 16l14 8-14 8V16z" fill="currentColor" />
        </svg>
        <span className={styles.duration}>{video.duration}</span>
      </div>
      <h4 className={styles.videoTitle}>{video.title}</h4>
      <span className={styles.videoDate}>{video.date}</span>
    </motion.a>
  )
}

function NewsItem({ item, index, isVisible }) {
  return (
    <motion.a
      href={item.link}
      className={styles.newsItem}
      initial={{ opacity: 0, x: 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.newsDate}>{item.date}</span>
      <h4 className={styles.newsHeadline}>{item.headline}</h4>
      <p className={styles.newsExcerpt}>{item.excerpt}</p>
    </motion.a>
  )
}

export default function Insights({
  heading = 'Insights',
  subtitle = 'Thoughts, talks, and updates',
  videos = {},
  news = {},
  background = 'grey',
  backgroundSwitcher = false,
}) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section id="insights" className={styles.section}>
      <SectionBackground background={background} backgroundSwitcher={backgroundSwitcher} />
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.headerBlock}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        <div className={styles.columns}>
          <div className={styles.videosCol}>
            <h3 className={styles.colLabel}>{videos.label}</h3>
            <motion.div
              className={styles.ytStats}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.ytStat}>
                <span className={styles.ytStatValue}>{videos.stats.subscribers}</span>
                <span className={styles.ytStatLabel}>{videos.statLabels?.subscribers || 'Subscribers'}</span>
              </div>
              <div className={styles.ytStat}>
                <span className={styles.ytStatValue}>{videos.stats.totalViews}</span>
                <span className={styles.ytStatLabel}>{videos.statLabels?.totalViews || 'Total Views'}</span>
              </div>
              <div className={styles.ytStat}>
                <span className={styles.ytStatValue}>{videos.stats.videos}</span>
                <span className={styles.ytStatLabel}>{videos.statLabels?.videos || 'Videos'}</span>
              </div>
            </motion.div>
            <div className={styles.videoGrid}>
              {videos.items.map((video, i) => (
                <VideoCard key={i} video={video} index={i} isVisible={isVisible} />
              ))}
            </div>
            <motion.a
              href={videos.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ytChannelLink}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {videos.channelLinkText || 'View all videos'} &rarr;
            </motion.a>
          </div>

          <div className={styles.newsCol}>
            <h3 className={styles.colLabel}>{news.label}</h3>
            <div className={styles.newsList}>
              {news.items.map((item, i) => (
                <NewsItem key={i} item={item} index={i} isVisible={isVisible} />
              ))}
            </div>
            <motion.a
              href={news.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinCta}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {news.ctaText} &rarr;
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
