import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import styles from './Registration.module.scss';
import logoPng from '../../assets/img/LogoAuth.png';
import {
    LockOutlined,
    UserOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    GooglePlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [EmailValue, setEmailValue] = useState('');
    const [PasswordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();
    const [ConfirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const { pathname } = location;


    const { state } = location;
    const [form] = Form.useForm();
    const [status, setStatus] = useState();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const [isLoading, setIsLoading] = useState(false);

    const CreateUser = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                'https://marathon-api.clevertec.ru/auth/registration',
                { email: EmailValue, password: PasswordValue },
            );
            console.log('User created successfully:', data);
            navigate('/result/success');
    
        } catch (error: any) {
            console.log('Error creating user:', error);

            console.log(error?.response?.status);

            if (error?.response?.status === 409) {
                navigate('/result/error-user-exist');
            } else {
                navigate('/result/error', { state: { email: EmailValue, password: PasswordValue } });
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
            setPasswordValue(state.password || '');
            setConfirmPasswordValue(state.password || ''); // Также устанавливаем в ConfirmPasswordValue
            CreateUser();

        }
        console.log('state', state);
        
    }, [state]);
 
    

    const [hasError, setHasError] = useState({});

    const onCheckField = async (fieldName: string, value: string) => {
        try {
            await form.validateFields([fieldName]);
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
        } catch (errorInfo) {
            setHasError((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <div className={styles.registration__block}>
                    <img src={logoPng} alt='logo' />
                    <Spin spinning={isLoading} size="large" data-test-id='loader'>
                        <Form
                            form={form}
                            name='normal_login'
                            className={styles.registration_form}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onValuesChange={() => {}}
                        >
                            <div className={styles.auth__buttons}>
                                <Link to={'/auth/login'}>
                                    <p>Войти</p>
                                </Link>
                                <p>Регистрация</p>
                            </div>
                            <Form.Item
                                name='email'
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
                                    data-test-id='registration-email'
                                    addonBefore='e-mail'
                                    value={EmailValue}
                                    onChange={(e) => {
                                        setEmailValue(e.target.value);
                                        onCheckField('email', e.target.value);
                                    }}
                                    allowClear
                                />
                            </Form.Item>

                            <Form.Item
                                name='password'
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
                                    data-test-id='registration-password'
                                    placeholder='Пароль'
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
                                name='confirm'
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пороли не совпадают',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error('Пароли не совпадают'),
                                            );
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    data-test-id='registration-confirm-password'
                                    placeholder='Пароль'
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

                            <Button
                                data-test-id='registration-submit-button'
                                type='primary'
                                block
                                onClick={() => CreateUser()}
                                disabled={Object.values(hasError).some((error) => error)}
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
    );
};
