'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './game.module.scss';
import { weapons } from '@/constants/weapons';

type Target = {
  id: number;
  x: number;
  y: number;
  points: 10 | 20 | 50 | 100;
  isHit: boolean;
  createdAt: number;
};

function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weaponId = searchParams.get('weapon');
  const weapon = weapons.find(w => w.id === Number(weaponId));
  
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); 
  const [isGameOver, setIsGameOver] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const baseUrl = process.env.BASE_URL || '';

  const getTargetLifetime = () => {
    return Math.max(1000, 2500 * (timeLeft / 20));
  };

  const getTargetInterval = () => {
    return Math.max(300, 1000 * (timeLeft / 20));
  };

  const createTarget = () => {
    if (!gameAreaRef.current) return;
    
    const { width, height } = gameAreaRef.current.getBoundingClientRect();
    const points = [10, 20, 50, 100] as const;
    
    const newTarget: Target = {
      id: Date.now(),
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 100),
      points: points[Math.floor(Math.random() * points.length)],
      isHit: false,
      createdAt: Date.now()
    };

    setTargets(prev => [...prev, newTarget]);
  };

  const handleTargetClick = (targetId: number) => {
    if (!gameStarted) return;

    setTargets(prev => 
      prev.map(target => 
        target.id === targetId 
          ? { ...target, isHit: true }
          : target
      )
    );

    const clickedTarget = targets.find(t => t.id === targetId);
    if (clickedTarget && !clickedTarget.isHit) {
      setScore(prev => prev + clickedTarget.points);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(20);
    setTargets([]);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const interval = setInterval(createTarget, getTargetInterval());

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver, timeLeft]);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setTargets(prev => prev.filter(target => {
        const lifetime = now - target.createdAt;
        return lifetime < getTargetLifetime() && !target.isHit;
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src={`${baseUrl}/background/background.png`}
          alt="Background"
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>

      <div className={styles.gameInterface}>
        {!isGameOver && (
          <div className={styles.header}>
            <div className={styles.score}>SCORE: {score}</div>
            <div className={styles.timer}>TIME: {timeLeft}s</div>
          </div>
        )}

        {!isGameOver && (
          <div 
            ref={gameAreaRef} 
            className={styles.gameArea}
          >
            <AnimatePresence>
              {targets.map(target => (
                <motion.div
                  key={target.id}
                  className={styles.target}
                  style={{
                    left: target.x,
                    top: target.y,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => handleTargetClick(target.id)}
                >
                  <Image
                    src={`${baseUrl}/points/${target.points}.png`}
                    alt={`${target.points} points`}
                    width={80}
                    height={80}
                    priority
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!gameStarted && !isGameOver && (
          <motion.div 
            className={styles.startScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1>Ready to Play?</h1>
            <button
              className={styles.startButton}
              onClick={startGame}
            >
              START GAME
            </button>
          </motion.div>
        )}

        {isGameOver && (
          <div className={styles.gameOverScreen}>
            <h1 className={styles.gameOverTitle}>AWESOME! NOW CHECK OUT THE VIDEO</h1>
            
            <div className={styles.gameOverContent}>
              <div className={styles.weaponScoreSection}>
                <Image
                  src={`${baseUrl}${weapon?.image}`}
                  alt="Selected weapon"
                  width={300}
                  height={200}
                  className={styles.weaponImage}
                  priority
                />
                <div className={styles.scoreDisplay}>
                  <div className={styles.scoreLabel}>YOUR SCORE:</div>
                  <div className={styles.scoreValue}>{score}</div>
                </div>
              </div>

              <div className={styles.videoSection}>
                <video 
                  className={styles.video}
                  controls
                  autoPlay
                  muted
                  playsInline
                >
                  <source src={`${baseUrl}/HSNF0100000H.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className={styles.gameOverButtons}>
              <button
                className={styles.goBackButton}
                onClick={() => router.push('/weapon-select')}
              >
                GO BACK
              </button>
              <button
                className={styles.visitNerfButton}
                onClick={() => window.open('https://nerf.hasbro.com', '_blank')}
              >
                VISIT NERF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Основной компонент страницы
export default function GamePage() {
  return (
    <Suspense fallback={
      <div className={styles.loading}>
        <h2>Loading...</h2>
      </div>
    }>
      <GameContent />
    </Suspense>
  );
}