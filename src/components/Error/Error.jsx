import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import errorPng from '../../assets/img/error.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


// Ваш компонент Error

export const Error = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log( location.state); 
  const { email, password } = location.state ;


  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <div className={styles.error__block}>
          <div className={styles.error__form}>
            <img src={errorPng} alt="error" />
            <h3>Данные не сохранились</h3>
            <p>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.</p>
            <Button
              type='primary'
              block
              data-test-id='registration-retry-button'
              onClick={() => navigate('/auth/registration', { state: { email, password } })}
            >
              <p>Повторить</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

