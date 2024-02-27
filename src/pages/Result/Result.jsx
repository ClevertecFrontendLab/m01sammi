import { Success } from '@components/Success/Success'
import React from 'react'
import styles from './Result.module.scss'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const Result = () => {
  return (
    <div className={styles.wrapper}>
         <div className={styles.background}>
            <Error/>
            {/* <Registration/> */}
            <Button data-test-id='registration-enter-button'><Link to=' /result/success '></Link> </Button>
            <Button data-test-id='registration-retry-button'><Link to='  /result/error '></Link> </Button>
            <Button data-test-id='registration-back-button'><Link to=' /result/error-user-exist '></Link> </Button>
            <Button data-test-id='login-retry-button'><Link to='/result/error-login'></Link> </Button>
            <Button data-test-id='check-retry-button'><Link to=' /result/error-check-email-no-exist '></Link> </Button>
            <Button data-test-id='check-back-button'><Link to=' /result/error-check-email  '></Link> </Button>
            <Button data-test-id='change-retry-button'><Link to=' /result/error-change-password   '></Link> </Button>
            <Button data-test-id='change-entry-button'><Link to='  /result/success-change-password   '></Link> </Button>
        </div>
   </div>
)
}
