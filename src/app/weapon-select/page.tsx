'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { weapons } from '@/constants/weapons';
import styles from './weapon-select.module.scss';

const RaysEffect = () => {
  return (
    <svg
      className={styles.rays}
      width="1800"
      height="800"
      viewBox="0 0 1800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={styles.raysGroup}>
        {/* Центральный луч */}
        <motion.path
          d="M900 400 L900 0"
          stroke="url(#blueGradient)"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Боковые лучи */}
        {[-40, -30, -20, -10, 0, 10, 20, 30, 40].map((angle, index) => (
          <motion.path
            key={angle}
            d={`M900 400 L${900 + Math.sin(angle * Math.PI / 180) * 800} ${400 - Math.cos(angle * Math.PI / 180) * 800}`}
            stroke="url(#blueGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </g>

      {/* Градиенты */}
      <defs>
        <linearGradient
          id="blueGradient"
          x1="900"
          y1="400"
          x2="900"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00E5FF" stopOpacity="1" />
          <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default function WeaponSelectPage() {
  const router = useRouter();
  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';

  const handlePrevWeapon = () => {
    setCurrentWeaponIndex((prev) => (prev === 0 ? weapons.length - 1 : prev - 1));
  };

  const handleNextWeapon = () => {
    setCurrentWeaponIndex((prev) => (prev === weapons.length - 1 ? 0 : prev + 1));
  };

  const handleStartGame = () => {
    router.push(`/game?weapon=${weapons[currentWeaponIndex].id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src={`${baseUrl}/background/Group2.png`}
          alt="Background"
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>

      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CHOOSE YOUR BLASTER THEN SHOOT THE TARGETS!
        </motion.h1>

        <div className={styles.weaponShowcase}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrevWeapon}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.div>
          </button>

          <div className={styles.weaponDisplay}>
            <div className={styles.weaponStage}>
              <div className={styles.effectsContainer}>
                {/* <RaysEffect /> */}
                <motion.div
                  className={styles.weaponContainer}
                  key={currentWeaponIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={`${baseUrl}${weapons[currentWeaponIndex].image}`}
                    alt={weapons[currentWeaponIndex].name}
                    width={400}
                    height={250}
                    priority
                    className={styles.weaponImage}
                  />
                </motion.div>
              </div>
            </div>

            <motion.div 
              className={styles.weaponName}
              key={`name-${currentWeaponIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {weapons[currentWeaponIndex].name}
            </motion.div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNextWeapon}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.div>
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <motion.button
            className={`${styles.button} ${styles.backButton}`}
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GO BACK
          </motion.button>

          <motion.button
            className={`${styles.button} ${styles.playButton}`}
            onClick={handleStartGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PLAY GAME
          </motion.button>
        </div>
      </div>
    </div>
  );
}