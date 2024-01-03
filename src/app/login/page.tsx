'use client';

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import http from "@/app/utils/http";
import { useQueryClient } from '@tanstack/react-query';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const router = useRouter();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const queryClient = useQueryClient()

    const handleForgotPassword = () => {
        router.push('/forgetPassword');
    };

    const handleRegister = () => {
        router.push('/signup');
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };

    const handleLogin = async () => {
        try {
            if (!email) {
                setError('Vui lòng nhập email');
                return;
            }
            if (!password) {
                setError('Vui lòng nhập password');
                return;
            }

            setLoading(true);
            const response = await http.axiosClient.post('/api/auth/login', { email, password });
            localStorage.setItem('accessToken', response.data?.resBody?.accessToken);
            localStorage.setItem('refreshToken', response.data?.resBody?.refreshToken);
            console.log(">>>>>>1" + response.data?.resBody?.accessToken)
            setLoginAttempts(0);
            setLoading(false);
            router.push('/');
            queryClient.invalidateQueries({ queryKey: ['verify'] })
        } catch (error) {
            setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại');
            setLoading(false);
            setLoginAttempts((prevAttempts) => prevAttempts + 1);
            if (loginAttempts + 1 === 5) {
                const changePassword = window.confirm(
                    'Bạn có muốn đổi mật khẩu không?'
                );
                if (changePassword) {
                    router.push('/forgetPassword');
                }

                setLoginAttempts(0);
            }
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center' }}>Đăng Nhập</h2>
                <label>
                    Địa chỉ email:
                    <Input
                        type="text"
                        value={email}
                        placeholder="Nhập email"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                    />
                    {!isEmailValid && <p style={{ color: 'red' }}>Email không hợp lệ.</p>}
                </label>
                <br />
                <label>
                    Password:
                    <Input
                        type="password"
                        value={password}
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        onClick={handleLogin}
                        loading={loading}
                        style={{ backgroundColor: '#FF0000', borderColor: '#ff0000' }}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <p
                            style={{
                                color: 'black',
                                cursor: 'pointer'
                            }}
                            onClick={handleForgotPassword}
                        >
                            Quên mật khẩu?
                        </p>
                    </div>
                </div>
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    margin: '5px 0',
                    color: 'black',
                    cursor: 'pointer'
                }}>
                    <a style={{ marginRight: '5px' }}>Bạn chưa có tài khoản?</a>
                    <span onClick={handleRegister} style={{ cursor: 'pointer' }}>Đăng kí ngay</span>
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
