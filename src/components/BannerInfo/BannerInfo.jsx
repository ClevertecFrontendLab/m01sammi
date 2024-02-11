import React from 'react'
import styles from './BannerInfo.module.scss'
import  calendarPng from '../../assets/img/calendar.png'
import trainingPng from '../../assets/img/training.png'
import achievementsPng from '../../assets/img/achievements.png'
import profilePng from '../../assets/img/profile.png'

export const BannerInfo = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_info}>
        <p>С CleverFit ты сможешь:<br/> 
        — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
         — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;<br/>
         — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках; <br/>
        — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.</p>
      </div>
      <div className={styles.banner_text}>
        <h4>CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!</h4>
      </div>
      <div className={styles.banner_buttons}>
        <div className={styles.button}>
          <p>Расписать тренировки</p>
          <div className={styles.block}>
                <img src={trainingPng} alt='training'/>
                <p>Тренировки</p>
            </div>
        </div>
        <div className={styles.button}>
          <p>Назначить календарь</p>
          <div className={styles.block}>
                <img src={calendarPng} alt='calendar'/>
                <p>Календарь</p>
            </div>
        </div>
        <div className={styles.button}>
          <p>Заполнить профиль</p>
          <div className={styles.block}>
                <img src={profilePng} alt='profile'/>
                <p>Профиль</p>
            </div>
        </div>
      </div>
    </div>
  )
}
