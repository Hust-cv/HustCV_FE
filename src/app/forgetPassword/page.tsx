'use client'
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import http from "@/app/utils/http";

// Define the ForgetPassword component
const ForgetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);


    // Function to handle email submission
    const handleEmailSubmit = async () => {
        try {
            if (!email) {
                setError('Vui lòng nhập email');
                return;
            }

            setLoading(true);

            const response = await http.post('/api/auths/forgotPassword', { email });
            console.log(response.data?.success);

            if (response.data?.success === true) {
                // Reset the error state if the email check is successful
                setError('');
                setStep(2);
            } else {
                setError('Email này không tồn tại');
                return ;
            }
        } catch (error) {
            console.error('Lỗi kiểm tra email:', error);
            // @ts-ignore
            setError('Đã xảy ra lỗi khi kiểm tra email');
        } finally {
            // Stop loading
            setLoading(false);
        }
    };


    // Function to handle verification code submission
    const handleVerificationCodeSubmit = async () => {
        try {
            if (!verificationCode) {
                setError('Vui lòng nhập mã xác nhận');
                return;
            }
            setLoading(true);
            const response = await http.post('/api/auths/checkCode', { verificationCode });
            const success = response.data?.success;
            if (success) {
                setError('');
                setStep(3);
            } else {
                setError('Mã này không tồn tại');
            }
        } catch (error) {
            console.error('Lỗi kiểm tra mã xác nhận:', error);
            setError('Đã xảy ra lỗi khi kiểm tra mã xác nhận');
        } finally {
            // Stop loading
            setLoading(false);
        }
    };


    // Function to handle password submission
    const handlePasswordSubmit = async () => {
        try {

            if (!newPassword) {
                    setError('Vui lòng nhập mật khẩu mới');
                    return;
            }
            setLoading(true);
            const response = await http.put('/api/auths/resetPassword', { newPassword });
            if (response.data?.success === true) {
                setError('');
                router.push('/login');
            } else {
                setError('Đã xảy ra lỗi khi đặt mật khẩu mới');
            }
        } catch (error) {
            console.error('Lỗi đặt mật khẩu mới:', error);
        }
    };
    const handleLogin = () => {
        router.push('/login');
    };

    // JSX structure for the ForgetPassword component
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
                {step === 1 && (
                    <>
                        <label>
                            Địa chỉ email:
                            <Input
                                type="text"
                                value={email}
                                placeholder="Nhập email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <Button
                                type="primary"
                                onClick={handleEmailSubmit}
                                loading={loading}
                                style={{ backgroundColor: '#FF0000', borderColor: '#ff0000' }}
                            >
                                {loading ? 'Đang Gửi...' : 'Gửi'}
                            </Button>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Button
                                    type="primary"
                                    onClick={handleLogin}
                                    style={{ backgroundColor: 'blue', borderColor: '#blue' }}
                                >
                                    Huỷ
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label>
                            Mã xác nhận:
                            <Input
                                type="text"
                                value={verificationCode}
                                placeholder="Nhập mã xác nhận"
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <Button
                                type="primary"
                                onClick={handleVerificationCodeSubmit}
                                loading={loading}
                                style={{ backgroundColor: '#FF0000', borderColor: '#ff0000' }}
                            >
                                {loading ? 'Đang Gửi...' : 'Gửi'}
                            </Button>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Button
                                    type="primary"
                                    onClick={handleLogin}
                                    style={{ backgroundColor: 'blue', borderColor: '#blue' }}
                                >
                                    Huỷ
                                </Button>
                            </div>
                        </div>

                    </>
                )}

                {step === 3 && (
                    <>
                        <label>
                            Mật khẩu mới:
                            <Input
                                type="text"
                                value={newPassword}
                                placeholder="New password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <Button
                                type="primary"
                                onClick={handlePasswordSubmit}
                                loading={loading}
                                style={{ backgroundColor: '#FF0000', borderColor: '#ff0000' }}
                            >
                                {loading ? 'Đang Gửi...' : 'Gửi'}
                            </Button>

                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Button
                                    type="primary"
                                    onClick={handleLogin}
                                    style={{ backgroundColor: 'blue', borderColor: '#blue' }}
                                >
                                    Huỷ
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

// Export the ForgetPassword component
export default ForgetPassword;
