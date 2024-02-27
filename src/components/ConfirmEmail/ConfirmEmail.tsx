import React, { useState, useEffect } from 'react';
import styles from './ConfirmEmail.module.scss';
import VerificationInput from 'react-verification-input';
import noticePng from '../../assets/img/notice.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

export const ConfirmEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emailValue = location.state?.email || '';
    const [CodeValue, setCodeValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    

    const ConfirmCode = async (enteredCode: any) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                'https://marathon-api.clevertec.ru/auth/confirm-email',
                {
                    email: emailValue,
                    code: enteredCode,
                },
                {
                    withCredentials: true, 
                }
            );

            console.log('Code is successful', data);
            setCodeValue('');
            navigate('/auth/change-password', { state: { email: emailValue } });
        } catch (error: any) {
            console.log(error);
            setCodeValue('');

        } finally {
            setCodeValue('');
            setIsLoading(false);

        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <div className={styles.error__block}>
                    <div className={styles.error__form}>
                        <img src={noticePng} alt="error" />
                        <h3>Введите код для восстановления аккаунта</h3>
                        <p>
                            Мы отправили вам на e-mail {emailValue} шестизначный код. Введите его в поле ниже.
                        </p>
                        {/* <Spin spinning={isLoading} size="large" data-test-id="loader"> */}
                            <div className="" data-test-id="verification-input">
                                
                            <VerificationInput
                                autoFocus={true}
                                value={CodeValue}
                                
                                onComplete={(enteredCode) => {
                                    console.log('Completed!', enteredCode);
                                    ConfirmCode(enteredCode);
                                }}
                                onChange={(enteredCode) => {
                                    setCodeValue(enteredCode);
                                }}
                                classNames={{
                                    container: 'container',
                                    character: 'character',
                                    characterInactive: 'character--inactive',
                                    characterSelected: 'character--selected',
                                    characterFilled: 'character--filled',
                                }}
                            />
                            </div>
                        {/* </Spin> */}
                        <p className={styles.ps}>Не пришло письмо? Проверьте папку Спам.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
