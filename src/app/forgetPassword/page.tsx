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
    const [isEmailValid, setIsEmailValid] = useState(true);
    const handleEmailBlur = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };


    const handleEmailSubmit = async () => {
        try {
            if (!email) {
                setError('Vui lòng nhập email');
                return;
            }
            setLoading(true);
            const response = await http.axiosClient.post('/api/auth/forgotPassword', { email });
            console.log(response.data?.statusCode);
            if (response.data?.statusCode === 200) {
                // lưu trong session để dùng cho các bước sau
                alert("Mã xác nhận đã được gửi đến email của bạn")
                sessionStorage.setItem('email', email);
                setError('');
                setStep(2);
            } else {
                setError('Địa chỉ email không tồn tại ');
                return ;
            }
        } catch (error) {
            // @ts-ignore
            setError('Địa chỉ email không tồn tại ');
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
            let email = sessionStorage.getItem('email');
            const response = await http.axiosClient.post('/api/auth/checkCode', { email,verificationCode });
            console.log(response.data?.statusCode )
            if (response.data?.statusCode === 200) {
                alert("Mã xác nhận chính xác")
                setError('');
                setStep(3);
            } else {
                setError('Mã này không tồn tại');
            }
        } catch (error) {
            console.error('Lỗi kiểm tra mã xác nhận:', error);
            setError('Đã nhập sai mã xác nhận');
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
            let email = sessionStorage.getItem('email');
            const response = await http.axiosClient.put('/api/auth/resetPassword', {email, newPassword });
            if (response.data?.statusCode === 200) {
                sessionStorage.clear();
                alert("Đặt lại mật khẩu mới thành công")
                setError('');
                router.push('/login');
            } else {
                setError('Đã xảy ra lỗi khi đặt mật khẩu mới');
            }
        } catch (error) {
            setError('Mật khẩu mới phải có ít nhất 8 ký tự');
        } finally {
            // Stop loading
            setLoading(false);
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
                                onBlur={handleEmailBlur}
                            />
                            {!isEmailValid && <p style={{ color: 'red' }}>Email không hợp lệ.</p>}
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
