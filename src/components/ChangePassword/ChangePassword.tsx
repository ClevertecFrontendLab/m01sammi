import React, { useState } from 'react';
import styles from './ChangePassword.module.scss';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const ChangePassword = () => {
    const [PasswordValue, setPasswordValue] = useState('');
    const [ConfirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const emailValue = location.state?.email || '';
    const [hasError, setHasError] = useState({});

    const onCheckField = async (fieldName: string, value: string) => {
        try {
            await form.validateFields([fieldName]);
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
        } catch (errorInfo) {
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
        }
    };
   

    const CreatePassword = async () => {
        try {
            const { data } = await axios.post(
                'https://marathon-api.clevertec.ru/auth/change-password',
                {
                    password: PasswordValue,
                    confirmPassword: ConfirmPasswordValue,
                },
                {
                    withCredentials: true, 
                }
            );
            console.log('Change successful', data);
    
            navigate('/result/success-change-password');
        } catch (error: any) {
            navigate('/result/error-change-password', { state: { password: PasswordValue, confirmPassword: ConfirmPasswordValue } });
            console.log(error);
        }
    };
    
    React.useEffect(() => {
        console.log(location.state);
         
        if(location.state.password && location.state.confirmPassword) {
            const { password } = location.state;
            const { confirmPassword } = location.state;
            setPasswordValue(password);
            setConfirmPasswordValue(confirmPassword);
            CreatePassword();
    
        }
        
    }, [location.state]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <div className={styles.error__block}>
                    <div className={styles.error__form}>
                        <h3>Восстановление аккаунта</h3>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                },
                                {
                                    min: 8,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])/,
                                    message:
                                        'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                },
                                {
                                    whitespace: true,
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                            data-test-id='change-password'
                                placeholder="Пароль"
                                value={PasswordValue}
                                onChange={(e) => {
                                    setPasswordValue(e.target.value);
                                    onCheckField('password', e.target.value);
                                }}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The two passwords do not match!')
                                        );
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                            data-test-id='change-confirm-password'
                                placeholder="Пароль"
                                value={ConfirmPasswordValue}
                                onChange={(e) => {
                                    setConfirmPasswordValue(e.target.value);
                                    onCheckField('confirm', e.target.value);
                                }}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                allowClear
                            />
                        </Form.Item>
                        <Button data-test-id='change-submit-button' type="primary" block onClick={() => CreatePassword()} className={styles.button}>
                            <p>Сохранить</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
