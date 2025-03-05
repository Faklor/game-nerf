'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { weapons } from '@/constants/weapons';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './weapon-select.module.scss';

export default function WeaponSelectPage() {
  const router = useRouter();
  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const bgImage = new window.Image();
    bgImage.src = `${baseUrl}/background/Group2.png`;
    bgImage.onload = () => setBgLoaded(true);

    // Предзагрузка изображений оружия
    Promise.all(
      weapons.map((weapon) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = `${baseUrl}${weapon.image}`;
          img.onload = resolve;
        });
      })
    ).then(() => setImagesLoaded(true));
  }, []);

  const handlePrevWeapon = () => {
    setCurrentWeaponIndex((prev) => (prev === 0 ? weapons.length - 1 : prev - 1));
  };

  const handleNextWeapon = () => {
    setCurrentWeaponIndex((prev) => (prev + 1) % weapons.length);
  };

  const currentWeapon = weapons[currentWeaponIndex];

  return (
    <div className={styles.container}>
      {(!bgLoaded || !imagesLoaded) && <LoadingSpinner />}
      
      <Image
        src={`${baseUrl}/background/Group2.png`}
        alt="Background"
        fill
        className={styles.backgroundImage}
        priority
        onLoadingComplete={() => setImagesLoaded(true)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzY5PTowOT1NOkE6Njk9RUpFSkhKPUxNWk1OSkr/2wBDAR"
      />

      <div className={styles.content}>
        <h1 className={styles.title}>CHOOSE YOUR BLASTER THEN SHOOT THE TARGETS!</h1>
        
        <div className={styles.weaponSection}>
          <button onClick={handlePrevWeapon} className={styles.navButton}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              ‹
            </motion.div>
          </button>

          <motion.div
            className={styles.weaponContainer}
            key={currentWeapon.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.weaponStand}>
              <Image
                src={`${baseUrl}${currentWeapon.image}`}
                alt={currentWeapon.name}
                width={500}
                height={300}
                priority
                className={styles.weaponImage}
              />
            </div>
            <div className={styles.weaponInfo}>
              <h3 className={styles.weaponName}>{currentWeapon.name}</h3>
              <div className={styles.weaponStats}>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>POWER</span>
                  <div className={styles.statBar}>
                    <div 
                      className={styles.statProgress}
                      style={{ width: `${currentWeapon.power}%` }}
                    />
                  </div>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>RADIUS</span>
                  <div className={styles.statBar}>
                    <div 
                      className={styles.statProgress}
                      style={{ width: `${(currentWeapon.hitRadius / 50) * 100}%` }}
                    />
                  </div>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>RELOAD</span>
                  <div className={styles.statBar}>
                    <div 
                      className={styles.statProgress}
                      style={{ width: `${100 - ((currentWeapon.reloadTime / 1000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <button onClick={handleNextWeapon} className={styles.navButton}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              ›
            </motion.div>
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.goBackButton}
            onClick={() => router.push('/intro')}
          >
            GO BACK
          </button>

          <motion.div
            className={styles.weaponTitle}
            key={currentWeapon.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentWeapon.name}
          </motion.div>

          <button
            className={styles.playButton}
            onClick={() => router.push(`/game?weapon=${currentWeapon.id}`)}
          >
            PLAY GAME
          </button>
        </div>
      </div>
    </div>
  );
}