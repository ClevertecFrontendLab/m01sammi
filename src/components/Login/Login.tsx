import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './Login.module.scss';
import logoPng from '../../assets/img/LogoAuth.png';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { Registration } from '@components/Registration/Registration';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();
    const [EmailValue, setEmailValue] = useState('');
    const [PasswordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [hasError, setHasError] = useState({});
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [isForgotButtonDisabled, setIsForgotButtonDisabled] = useState(true); // Новое состояние
    const location = useLocation();
    const { pathname } = location;


    const { state } = location;

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const onCheckField = async (fieldName: string, value: string) => {
        try {
            await form.validateFields([fieldName]);
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: false }));

            // Check if the field is an email
            if (fieldName === 'email') {
                setIsForgotButtonDisabled(false); // Разблокировать кнопку, если email валиден
            }

            // Check if the field is a password and value does not meet the criteria
            if (fieldName === 'password' && value.length < 8) {
                setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
            }
        } catch (errorInfo) {
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: true }));

            // Check if the field is an email
            if (fieldName === 'email') {
                setIsForgotButtonDisabled(true); // Заблокировать кнопку, если email не валиден
            }
        }
    };

    const CreateUser = async () => {
        const object = {
            email: EmailValue,
            password: PasswordValue
        }

        try {
            setIsLoading(true);

            const { data } = await axios.post(
                'https://marathon-api.clevertec.ru/auth/login',
                object,
            );
            console.log('User created successfully:', data);

            console.log('hasError', hasError);

            localStorage.setItem('authToken', data.accessToken);
            setIsLoading(false);

            
            navigate('/main');
        } catch (error: any) {
            console.log('Error creating user:', error);

            console.log(error?.response?.status);

            navigate('/result/error-login');
        } finally {
            setPasswordValue('');
        }
    };

    
    const CheckEmail = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.post(
                'https://marathon-api.clevertec.ru/auth/check-email',
                { email: EmailValue },
                );
                
                navigate('/auth/confirm-email', { state: { email: EmailValue } });
            } catch (error: any) {
                console.log('Ошибка проверки электронной почты:', error);
                
                if (error?.response?.status === 404) {
                    navigate('/result/error-check-email-no-exist', );
                } else {
                    navigate('/result/error-check-email', { state: { email: EmailValue } });
                }
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            // Если есть данные из предыдущей страницы, установите их в соответствующие состояния
            if (location.state) {
                console.log('state Empty', state);
                setEmailValue(state.email || '');
                CheckEmail();
    
            }
            console.log('state', state);
            
        }, [state]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <div className={styles.login__block}>
                    <img src={logoPng} alt="logo" />
                    <div className="loader" data-test-id='loader'>
                        <Spin spinning={isLoading} size="large">
                            <Form
                                form={form}
                                name="normal_login"
                                className={styles.login_form}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <div className={styles.auth__buttons}>
                                    <p>Войти</p>
                                    <Link to={'/auth/registration'}>
                                        <p>Регистрация</p>
                                    </Link>
                                </div>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                        {
                                            required: true,
                                        },
                                        
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        data-test-id="login-email"
                                        addonBefore="e-mail"
                                        value={EmailValue}
                                        onChange={(e) => {
                                            setEmailValue(e.target.value);
                                            onCheckField('email', e.target.value);
                                        }}
                                        allowClear
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            min: 8,
                                        },
                                        {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])/,
                                        },
                                        {
                                            whitespace: true,
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        data-test-id="login-password"
                                        placeholder="Пароль"
                                        value={PasswordValue}
                                        onChange={(e) => {
                                            setPasswordValue(e.target.value);
                                            onCheckField('password', e.target.value);
                                        }}
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                    />
                                </Form.Item>
                                <Form.Item className={styles.login_buttons}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox data-test-id="login-remember">Запомнить меня</Checkbox>
                                    </Form.Item>
                                    <div className="" data-test-id="login-forgot-button">
                                        <div
                                            className={`login-form-forgot ${isForgotButtonDisabled ? 'disabled' : ''}`}
                                            onClick={() => (isForgotButtonDisabled ? null : CheckEmail())}                                        >
                                            Забыли пароль?
                                        </div>
                                    </div>
                                </Form.Item>
                                <Button
                                    data-test-id="login-submit-button"
                                    type="primary"
                                    block
                                    onClick={() => {
                                        if (PasswordValue.length >= 8) {
                                            CreateUser();
                                        } else {

                                            console.log('Password does not meet validation criteria');
                                        }
                                    }}
                                    className={styles.button}
                                >
                                    Войти
                                </Button>
                                <Button icon={<GooglePlusOutlined />} block className={styles.button}>
                                    Войти через Google
                                </Button>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    );
};
