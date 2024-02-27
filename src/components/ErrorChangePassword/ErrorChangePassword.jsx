import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import errorPng from '../../assets/img/error.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const ErrorChangePassword = () => {

  const navigate = useNavigate();

  const location = useLocation();
  console.log( location.state); 
  const { confirmPassword, password } = location.state ;

  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.error__block}>
                <div className={styles.error__form}>
                    <img src={errorPng} alt="error"/>
                    <h3>Данные не сохранились</h3>
                    <p>Что-то пошло не так. Попробуйте ещё раз</p>
                    <Button
                            type='primary'
                            block
                            data-test-id='change-retry-button'
                            onClick={() => navigate('/auth/change-password', { state: { confirmPassword, password } })}
                        >
                           <p>Повторить</p>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
