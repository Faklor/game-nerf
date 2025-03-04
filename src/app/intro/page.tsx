'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { weapons } from '@/constants/weapons';
import styles from './intro.module.scss';

export default function IntroPage() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const baseUrl = process.env.BASE_URL || '';

  return (
    <div className={styles.intro}>
      <Image
        src={`${baseUrl}/background/background.png`}
        alt="Background"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.content}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={`${baseUrl}/background/logo.png`}
            alt="NERF Logo"
            width={400}
            height={200}
            priority
          />
        </motion.div>

        <motion.div 
          className={styles.weaponsShowcase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.weaponsContainer}>
            {weapons.map((weapon, index) => (
              <motion.div
                key={weapon.id}
                className={styles.weaponImage}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <Image
                  src={`${baseUrl}${weapon.image}`}
                  alt={weapon.name}
                  width={250}
                  height={100}
                  priority
                />
              </motion.div>
            ))}
          </div>
          <motion.h2
            className={styles.weaponsTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            CHOOSE YOUR BLASTER THEN SHOOT AS MANY TARGETS AS YOU CAN WITHIN THE TIME LIMIT!
          </motion.h2>
        </motion.div>

        <div className={styles.buttonGroup}>
          <motion.button
            className={`${styles.button} ${styles.playButton}`}
            onClick={() => router.push('/weapon-select')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            PLAY MINIGAME
          </motion.button>

          <motion.button
            className={`${styles.button} ${styles.watchButton}`}
            onClick={() => setShowVideo(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            WATCH VIDEO
          </motion.button>

          <motion.button
            className={`${styles.button} ${styles.rangeButton}`}
            onClick={() => router.push('/carousel')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            VIEW RANGE
          </motion.button>

          <motion.button
            className={`${styles.button} ${styles.visitButton}`}
            onClick={() => window.open('https://nerf.hasbro.com', '_blank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            VISIT NERF
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.videoContainer}>
              <button 
                className={styles.closeButton}
                onClick={() => setShowVideo(false)}
              >
                ✕
              </button>
              <video
                controls
                autoPlay
                className={styles.video}
                onClick={(e) => e.stopPropagation()}
              >
                <source src={`${baseUrl}/HSNF0100000H.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}