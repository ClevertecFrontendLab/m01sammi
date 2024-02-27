import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import errorPng from '../../assets/img/error.png'
import warningPng from '../../assets/img/warning.png'

export const ErrorLogin = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.error__block}>
                <div className={styles.error__form}>
                    <img src={warningPng} alt="error"/>
                    <h3>Вход не выполнен</h3>
                    <p>Что-то пошло не так. Попробуйте еще раз</p>
                    <Button
                            type='primary'
                            block
                            data-test-id='login-retry-button'
                            
                        >
                           <Link to={'/auth/login'} ><p>Повторить</p></Link>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
