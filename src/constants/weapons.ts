export interface Weapon {
  id: number;
  name: string;
  image: string;
  power: number;
  description: string;
  hitRadius: number; // Радиус поражения в пикселях
  reloadTime: number; // Время перезарядки в миллисекундах
}

export const weapons: Weapon[] = [
  {
    id: 1,
    name: "ELITE 2.0 VOLT",
    image: "/weapons/NERF_Elite20_Volt.png",
    power: 75,
    hitRadius: 30,
    reloadTime: 800,
    description: "ELITE 2.0 VOLT IS EQUIPPED WITH 2 TACTICAL RAILS AND LIGHT BEAM TARGETING, REACHING UP TO 15 FEET. INCLUDES 6 OFFICIAL NERF DARTS AND FIRES DARTS UP TO 90 FEET."
  },
  {
    id: 2,
    name: "ELITE 2.0 COMMANDER",
    image: "/weapons/NERF_Elite20_Commander.png",
    power: 85,
    hitRadius: 40,
    reloadTime: 600,
    description: "ELITE 2.0 COMMANDER HAS A 6-DART ROTATING DRUM, 3 TACTICAL RAILS AND 2 STOCK ATTACHMENTSIRE. FIRE 1 DART OR LAUNCH ALL 6 DARTS, WITH SLAM-FIRE ACTION. COMES WITH 6 ELITE DARTS."
  },
  {
    id: 3,
    name: "ELITE 2.0 ECHO",
    image: "/weapons/NERF_Elite20_Auto.png",
    power: 90,
    hitRadius: 45,
    reloadTime: 200,
    description: "ELITE 2.0 ECHO HAS REMOVABLE STOCK AND BARREL, WITH 4 CONFIGURATIONS IN ONE. FIRE 1 DART AT A TIME OR 10 DARTS RAPIDLY. COMES WITH 24 NERF ELITE DARTS."
  },
  {
    id: 4,
    name: "ELITE 2.0 SHOCKWAVE",
    image: "/weapons/NERF_Elite20_Shockwave.png",
    power: 95,
    hitRadius: 50,
    reloadTime: 500,
    description: "ELITE 2.0 SHOCKWAVE COMES WITH 30 OFFICIAL NERF DARTS TO FULLY LOAD THE 15-DART ROTATING DRUM. UNLEASH 1 DART, OR SLAM-FIRE ALL 15 DARTS AT ONCE. FIRES UP TO 90 FEET."
  }
];