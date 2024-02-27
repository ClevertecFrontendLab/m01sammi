import React, { useState } from 'react';

import styles from './main-page.module.scss';
import { Header } from '@components/Header/Header';
import { Navigation } from '@components/Navigation/Navigation';
import { Footer } from '@components/Footer/Footer';
import { BannerInfo } from '@components/BannerInfo/BannerInfo';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

export const MainPage: React.FC = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/auth');
        }
    })

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                <Spin spinning={false} size="large" data-test-id='loader' ></Spin>

                    <Navigation/>
                    <div className={styles.main} >
                    {/* <BannerInfo/>
                    <Footer/> */}
                                <Header/>
                            <div className={styles.main_block}><div className={styles.banner_info}>

                                <BannerInfo />
                            </div>
                                <Footer/>
                            </div>
                    </div>               
                </div>
            </div>        
        </>
    );
};
