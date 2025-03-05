'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { weapons } from '@/constants/weapons';
import styles from './carousel.module.scss';

export default function CarouselPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';

  const nextWeapon = () => {
    setCurrentIndex((prev) => (prev + 1) % weapons.length);
  };

  const prevWeapon = () => {
    setCurrentIndex((prev) => (prev - 1 + weapons.length) % weapons.length);
  };

  const currentWeapon = weapons[currentIndex];

  return (
    <div className={styles.container}>
      <Image
        src={`${baseUrl}/background/backCarousel.png`}
        alt="Background"
        fill
        className={styles.backgroundImage}
        priority
      />
      
      <div className={styles.header}>
        SWIPE LEFT AND RIGHT TO VIEW THE RANGE!
      </div>

      <div className={styles.content}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevWeapon}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.div>
        </button>

        <div className={styles.mainContent}>
          <div className={styles.weaponSection}>
            <motion.div
              className={styles.weaponContainer}
              key={currentWeapon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.glowEffect} />
              <Image
                src={`${baseUrl}${currentWeapon.image}`}
                alt={currentWeapon.name}
                width={500}
                height={300}
                priority
                className={styles.weaponImage}
              />
            </motion.div>
          </div>

          <div className={styles.infoSection}>
            <motion.h2
              key={`title-${currentWeapon.id}`}
              className={styles.weaponTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentWeapon.name}
            </motion.h2>
            <motion.p
              key={`desc-${currentWeapon.id}`}
              className={styles.weaponDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentWeapon.description}
            </motion.p>
          </div>
        </div>

        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextWeapon}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.div>
        </button>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.goBackButton}
          onClick={() => router.push('/intro')}
        >
          GO BACK
        </button>
        <button
          className={styles.visitButton}
          onClick={() => window.open('https://nerf.hasbro.com', '_blank')}
        >
          VISIT NERF
        </button>
      </div>
    </div>
  );
}