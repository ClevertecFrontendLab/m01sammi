import React from 'react'
import styles from './Success.module.scss'
import successPng from '../../assets/img/success.png'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const SuccessChangePassword = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.success__block}>
                <div className={styles.success__form}>
                    <img src={successPng} alt="success"/>
                    <h3>Пароль успешно изменен</h3>
                    <p>Теперь можно войти в аккаунт, используя свой логин и новый пароль</p>
                    <Button
                            type='primary'
                            block
                            data-test-id='change-entry-button'
                            
                        >
                            <Link to={'/auth'}>
                                <p>Вход</p>
                            </Link>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
