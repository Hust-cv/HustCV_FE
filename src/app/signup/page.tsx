'use client';

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import http from "@/app/utils/http";
import { message ,DatePicker} from 'antd';
import {Form} from "react-bootstrap";

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [isEmployerOption, setIsEmployerOption] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const handleIsEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEmployerOption(event.target.checked);
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };
    const handlePasswordBlur = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        const isValid = passwordRegex.test(password);
        setIsPasswordValid(isValid);
    };
    const handlePhoneBlur = () => {
        const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const isValid = phoneRegex.test(phoneNumber);
        setIsPhoneValid(isValid);
    };
    const handleSignup = async () => {
        let response = null ;
        try {
            if (!email || !password || !username|| !phoneNumber|| !birthDay|| !confirmPass) {
                setError('Vui lòng nhập đầy đủ thông tin đăng ký');
                setLoading(false);
                return;
            }
            if(password !== confirmPass){
                setError('Mật khẩu không khớp');
                setLoading(false);
                return;
            }
            if(birthDay>new Date().toISOString().slice(0, 10)){
                setError('Ngày sinh không hợp lệ');
                setLoading(false);
                return;
            }
            setLoading(true);
            let role_id = 2; // Default role for job seeker
            let business_id = null;
            if (isEmployerOption) {
                if (!businessName || !businessAddress || !businessWebsite) {
                    setError('Vui lòng nhập đầy đủ thông tin công ty');
                    setLoading(false);
                    return;
                }
                role_id = 1;
                try {
                    const businessResponse = await http.axiosClient.post('/api/business', {
                        businessName,
                        businessAddress,
                        businessWebsite,
                    });
                    business_id = businessResponse.data?.id;
                } catch (businessError) {
                        message.error('Đã xảy ra lỗi khi tạo công ty');
                        setLoading(false);
                }
            }
            try {
            const response = await http.axiosClient.post('/api/users', {
                    username,
                    email,
                    password,
                    phoneNumber,
                    birthDay,
                    role_id,
                    business_id,
                });
                    message.success('Đăng ký thành công xin mời đăng nhập');
                    router.push('/login');
                    setLoading(false);
            } catch (error) {
                //@ts-ignore
                if (error.response && error.response.status === 401) {
                    setLoading(false);
                    message.error('Email đã tồn tại');
                }// @ts-ignore
                else if (error.response && error.response.status === 400) {
                    message.error('Vui lòng nhập đầy đủ thông tin');
                    setLoading(false);
                } else {
                    setLoading(false);
                    message.error('Hệ thống đang bận');
                }
            }
        } catch (e) {
            // @ts-ignore
            setLoading(false);
        }finally {
            // Stop loading
            setLoading(false);
        }
    };
    const handleLogin = () => {
        router.push('/login');
    };
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '150vh',
            backgroundImage: "linear-gradient(to bottom, #ffffff, #e0e0e0)",
        }}>
            <p style={{
                fontSize: 30, fontWeight: 'bold',
                position: 'absolute', top: '100px', left: '100px'
            }}>
                Chào mừng bạn đến với HustCv
            </p>
            <div style={{
                border: '1px solid #ccc',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%'

            }}>
                <h2 style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>Đăng Ký</h2>
                <label>
                    Họ và tên:
                    <Input
                        type="text"
                        value={username}
                        placeholder="Nhập họ và tên"
                        onChange={(e) => setUsername(e.target.value)}
                        style={{marginBottom: '20px'}}
                    />
                </label>
                <br/>
                <label>
                    Địa chỉ email:
                    <Input
                        type="text"
                        value={email}
                        placeholder="Nhập email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{marginBottom: '20px'}}
                        onBlur={handleEmailBlur}
                    />
                    {!isEmailValid && <p style={{color: 'red'}}>Email không hợp lệ.</p>}
                </label>
                <br/>
                <label>
                    Mật khẩu:
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{marginBottom: '20px'}}
                        onBlur={handlePasswordBlur}
                    />
                    {!isPasswordValid && <p style={{color: 'red'}}>
                      Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường và
                      1 số.
                    </p>}
                </label>
                <label>
                    Nhập lại mật khẩu:
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={confirmPass}
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </label>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label=" Hiển thị mật khẩu"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}/>
                </Form.Group>
                <label>
                    Số điện thoại:
                    <Input
                        type="text"
                        value={phoneNumber}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{marginBottom: '20px'}}
                        onBlur={handlePhoneBlur}
                    />
                    {!isPhoneValid && <p style={{color: 'red'}}>Số điện thoại không hợp lệ.</p>}
                </label>
                <br/>
                {/*<label>*/}
                {/*    Ngày sinh:*/}
                {/*    <Input*/}
                {/*        type="text"*/}
                {/*        value={birthDay}*/}
                {/*        placeholder="Nhập ngày sinh"*/}
                {/*        onChange={(e) => setBirthDay(e.target.value)}*/}
                {/*        style={{ marginBottom: '20px' }}*/}
                {/*    />*/}
                {/*</label>*/}
                <label>
                    Ngày sinh:
                    <DatePicker onChange={(date, dateString) => setBirthDay(dateString)}
                                style={{marginBottom: '20px'}}/>
                </label>
                <br/>
                {/* Employer option */}
                <div style={{marginBottom: '20px'}}>
                    <label>
                        Bạn có phải nhà tuyển dụng không?
                        <input
                            type="checkbox"
                            checked={isEmployerOption}
                            onChange={handleIsEmployerChange}
                            style={{marginLeft: '5px'}}
                        />
                    </label>
                </div>
                {/* Render additional fields if isEmployerOption is true */}
                {isEmployerOption && (
                    <>
                        <label>
                            Tên công ty:
                            <Input
                                type="text"
                                value={businessName}
                                placeholder="Nhập tên công ty"
                                onChange={(e) => setBusinessName(e.target.value)}
                                style={{marginBottom: '20px'}}
                            />
                        </label>
                        <br/>
                        <label>
                            Địa chỉ công ty:
                            <Input
                                type="text"
                                value={businessAddress}
                                placeholder="Nhập địa chỉ công ty"
                                onChange={(e) => setBusinessAddress(e.target.value)}
                                style={{marginBottom: '20px'}}
                            />
                        </label>
                        <br/>
                        <label>
                            Website công ty:
                            <Input
                                type="text"
                                value={businessWebsite}
                                placeholder="Nhập website công ty"
                                onChange={(e) => setBusinessWebsite(e.target.value)}
                                style={{marginBottom: '20px'}}
                            />
                        </label>
                        <br/>
                    </>
                )}
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <Button
                        type="primary"
                        onClick={handleSignup}
                        loading={loading}
                        style={{backgroundColor: '#FF0000', borderColor: '#ff0000'}}
                    >
                        {loading ? 'Đang đăng kí...' : 'Đăng kí'}
                    </Button>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                        <Button
                            type="primary"
                            onClick={handleLogin}
                            style={{backgroundColor: 'blue', borderColor: '#blue'}}
                        >
                            Huỷ
                        </Button>
                    </div>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </div>
    );

};

export default Signup;
