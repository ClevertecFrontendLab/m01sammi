import React from 'react'
import styles from './Authentication.module.scss'
import logoPng from '../../assets/img/Logo.png'
import { Login } from '@components/Login/Login'
import { Registration } from '@components/Registration/Registration'

export const Authentication = () => {
  return (
   <div className={styles.wrapper}>
         <div className={styles.background}>
            <Login/>
        </div>
   </div>
  )
}
