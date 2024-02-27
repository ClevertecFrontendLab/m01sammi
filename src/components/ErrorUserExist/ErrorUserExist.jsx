import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import errorPng from '../../assets/img/error.png'
import styles from './Error.module.scss'

export const ErrorUserExist = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.error__block}>
                <div className={styles.error__form}>
                    <img src={errorPng} alt="error"/>
                    <h3>Данные не сохранились</h3>
                    <p>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.</p>
                    <Button
                            type='primary'
                            block
                            data-test-id='registration-back-button' 
                        >
                           <Link to={'/auth/registration'}>
                           <p>Назад к регистрации</p>
                           </Link>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
