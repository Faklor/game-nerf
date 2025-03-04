export interface Weapon {
    id: number;
    name: string;
    image: string;
    power: number;
    description: string;
  }
  
  export const weapons: Weapon[] = [
    {
      id: 1,
      name: "NERF Elite 2.0 Volt",
      image: "/weapons/NERF_Elite20_Volt.png",
      power: 75,
      description: "Компактный и мощный бластер"
    },
    {
      id: 2,
      name: "NERF Elite 2.0 Commander",
      image: "/weapons/NERF_Elite20_Commander.png",
      power: 85,
      description: "Улучшенная точность и дальность"
    },
    {
      id: 3,
      name: "NERF Elite 2.0 Auto",
      image: "/weapons/NERF_Elite20_Auto.png",
      power: 90,
      description: "Автоматическая стрельба"
    },
    {
      id: 4,
      name: "NERF Elite 2.0 Shockwave",
      image: "/weapons/NERF_Elite20_Shockwave.png",
      power: 95,
      description: "Максимальная мощность"
    }
  ];