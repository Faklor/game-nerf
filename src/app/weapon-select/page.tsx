'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { weapons } from '@/constants/weapons';
import styles from './weapon-select.module.scss';

export default function WeaponSelectPage() {
  const router = useRouter();
  const [selectedWeapon, setSelectedWeapon] = useState<number | null>(null);

  const handleWeaponSelect = (weaponId: number) => {
    setSelectedWeapon(weaponId);
  };

  const handleStartGame = () => {
    if (selectedWeapon !== null) {
      router.push(`/game?weapon=${selectedWeapon}`);
    }
  };

  return (
    <div className={styles.weaponSelect}>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Выберите бластер
      </motion.h1>
      
      <div className={styles.weaponsGrid}>
        {weapons.map((weapon) => (
          <motion.div
            key={weapon.id}
            className={`${styles.weaponCard} ${selectedWeapon === weapon.id ? styles.selected : ''}`}
            onClick={() => handleWeaponSelect(weapon.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.weaponImage}>
              <img src={weapon.image} alt={weapon.name} />
            </div>
            <h3>{weapon.name}</h3>
            <p>{weapon.description}</p>
            <div className={styles.powerBar}>
              <div 
                className={styles.powerFill} 
                style={{ width: `${weapon.power}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className={`button ${styles.startButton} ${!selectedWeapon ? styles.disabled : ''}`}
        onClick={handleStartGame}
        disabled={selectedWeapon === null}
        whileHover={selectedWeapon !== null ? { scale: 1.1 } : {}}
        whileTap={selectedWeapon !== null ? { scale: 0.95 } : {}}
      >
        Начать игру
      </motion.button>
    </div>
  );
}