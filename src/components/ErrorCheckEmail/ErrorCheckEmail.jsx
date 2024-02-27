import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import errorPng from '../../assets/img/error.png'
import wrongPng from '../../assets/img/wrong.png'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const ErrorCheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log( location.state); 
  const { email } = location.state ;

  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <div className={styles.error__block}>
                <div className={styles.error__form}>
                    <img src={wrongPng} alt="error"/>
                    <h3>Что-то пошло не так</h3>
                    <p>Произошла ошибка, попробуйте отправить форму ещё раз.</p>
                    <Button
                            type='primary'
                            block
                            className={styles.button}
                            data-test-id='check-back-button'
                            onClick={() => navigate('/auth/login', { state: { email } })}
                        >
                           <p>Назад</p>
                        </Button>
                </div>
            </div>
        </div>
   </div>
  )
}
