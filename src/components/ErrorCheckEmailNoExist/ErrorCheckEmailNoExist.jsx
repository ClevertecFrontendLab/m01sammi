import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ErrorCheckEmailNoExist.module.scss'
import errorPng from '../../assets/img/error.png'

export const ErrorCheckEmailNoExist = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.error__block}>
                <div className={styles.error__form}>
                    <img src={errorPng} alt="error"/>
                    <h3>Такой e-mail не зарегистрирован</h3>
                    <p>Мы не нашли в базе вашего e-mail. Попробуйте <br></br> войти с другим e-mail.</p>
                    <Button
                            type='primary'
                            block
                            className={styles.button}
                            data-test-id='check-retry-button'
                            
                        >
                           <Link to={'/auth/login'}><p>Попробовать снова</p></Link>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
