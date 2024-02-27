import React, { useEffect } from 'react'
import logoPng from '../../assets/img/Logo.png'
import styles from './Navigation.module.scss'
import calendarPng from '../../assets/img/calendar.png'
import trainingPng from '../../assets/img/training.png'
import achievementsPng from '../../assets/img/achievements.png'
import profilePng from '../../assets/img/profile.png'
import exitPng from '../../assets/img/exit.png'
import closePng from '../../assets/img/close.png'
import { useState } from 'react'    
import smallLogo from '../../assets/img/smallLogo.png'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const logos = [logoPng, smallLogo];

    const toggleNavigation = () => {
        setIsOpen(!isOpen);
        changeLogo();
      };

    const changeLogo = () => {
        setCurrentLogoIndex((currentLogoIndex + 1) % logos.length);
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

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
    <nav className={styles.navigation}>
        <div className={ isOpen ? styles.navigation_block : styles.navigation_block_close}>
            <div className={styles.logo}>
                <img src={logos[currentLogoIndex]} alt='logo'/>
            </div>
            <div className={styles.buttons_block}>
                <div className={styles.all_buttons}>
                    <div className={styles.block}>
                        <img src={calendarPng} alt='calendar'/>
                        <p>Календарь</p>
                    </div>
                    <div className={styles.block}>
                        <img src={trainingPng} alt='training'/>
                        <p>Тренировки</p>
                    </div>
                    <div className={styles.block}>
                        <img src={achievementsPng} alt='achievements'/>
                        <p>Достижения</p>
                    </div>
                    <div className={styles.block}>
                        <img src={profilePng} alt='profile'/>
                        <p>Профиль</p>
                    </div>
                </div>
                <Link to='/auth/login'>
                    <div className={styles.exit}>
                        <img src={exitPng} alt='exit'/>
                        <p>Выход</p>
                    </div>
                </Link>
            </div>
        </div>
        <div className={ isOpen ? styles.navigation_button : styles.navigation_button_close} onClick={toggleNavigation} data-test-id={isMobile?'sider-switch-mobile':'sider-switch'}>
            <img src={closePng} alt='close'/>
        </div>
    </nav>
  )
}
