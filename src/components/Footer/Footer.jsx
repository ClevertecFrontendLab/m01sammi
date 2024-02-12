import React from 'react'
import styles from './Footer.module.scss'
import androindPng from '../../assets/img/android.png'
import applePng from '../../assets/img/apple.png'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Смотреть отзывы</p>
        <div className={styles.downland_block}>
            <p>Скачать на телефон</p>
            <p className={styles.pro}>Доступно в PRO-тарифе</p>
            <div className={styles.downland}>
                <div className={styles.downland_link}>
                    <img src={androindPng} alt="downland"/>
                    <p>Android OS</p>
                </div>
                <div className={styles.downland_link}>
                    <img src={applePng} alt="downland"/>
                    <p>Apple IOS</p>
                </div>
            </div>
        </div>
    </footer>
  )
}
