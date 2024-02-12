import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import settingsPng from '../../assets/img/settings.png';
import settingsSmall from '../../assets/img/settingsSmall.png';

export const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  const images = [settingsPng, settingsSmall];

  const changeImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <p>Главная</p>
      <div className={styles.header_line}>
        <h1>Приветствуем тебя в CleverFit — приложении,<br/> которое поможет тебе добиться своей мечты!</h1>
        <div className={styles.settings}>
          <img src={isMobile ? images[1] : images[0]} alt="settings" />
          <p>Настройки</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
