import React from 'react'
import styles from './Success.module.scss'
import successPng from '../../assets/img/success.png'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const Success = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.success__block}>
                <div className={styles.success__form}>
                    <img src={successPng} alt="success"/>
                    <h3>Регистрация успешна</h3>
                    <p>Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.</p>
                    <Button
                            type='primary'
                            block
                            data-test-id='registration-enter-button' 

                            
                        >
                            <Link to={'/auth/login'}>
                                <p>Войти</p>
                            </Link>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
