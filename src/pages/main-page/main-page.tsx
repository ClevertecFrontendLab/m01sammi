import React, { useState } from 'react';

import styles from './main-page.module.scss';
import { Header } from '@components/Header/Header';
import { Navigation } from '@components/Navigation/Navigation';
import { Footer } from '@components/Footer/Footer';
import { BannerInfo } from '@components/BannerInfo/BannerInfo';

export const MainPage: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
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
