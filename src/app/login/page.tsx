'use client'

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js for navigation
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // ... code for handling login ...
            setLoading(true); // Set loading to true while processing login
            // Use axios or your preferred method to send a login request
            // Example: const response = await axios.post('/api/login', { username, password });
            // ... handle success or failure ...
            setLoading(false); // Set loading back to false after processing login
            // ... navigate to the next page or show an error message ...
        } catch (error) {
            setError('Failed to log in. Please try again.'); // Set error message if login fails
            setLoading(false); // Set loading back to false in case of failure
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <label>
                    Username:
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <Button type="primary" onClick={handleLogin} loading={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
