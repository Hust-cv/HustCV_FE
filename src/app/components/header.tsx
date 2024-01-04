'use client'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import type { MenuProps, } from 'antd';
import { Menu, Button, Popover, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import http from '../utils/http';
import { useEffect, useState } from 'react';
const items: MenuProps['items'] = [
    {
        label: 'All Jobs',
        key: 'All Job',
        children: [
            {
                label: 'Việc làm IT theo kĩ năng',
                key: 'job by skills',
                children: [
                    {
                        label: 'Kĩ năng 1',
                        key: 'skill 1',
                    },
                    {
                        label: 'Kĩ năng 2',
                        key: 'skill 2'
                    }
                ]
            },
            {
                label: 'Việc làm IT theo cấp bậc',
                key: 'job by Title',
                children: [
                    {
                        label: 'Kĩ năng 1',
                        key: 'skill 3',
                    },
                    {
                        label: 'Kĩ năng 2',
                        key: 'skill 4'
                    }
                ]
            },
            {
                label: 'Việc làm IT theo công ty',
                key: 'job by company',
                children: [
                    {
                        label: 'Kĩ năng 1',
                        key: 'skill 5',
                    },
                    {
                        label: 'Kĩ năng 2',
                        key: 'skill 6'
                    }
                ]
            },
            {
                label: 'Việc làm IT theo thành phố',
                key: 'job by cities',
                children: [
                    {
                        label: 'Thành phố 1',
                        key: 'skill 7',
                    },
                    {
                        label: 'Thành phố 2',
                        key: 'skill 8'
                    }
                ]
            },
        ]
    },
    {
        label: 'Top Công ty IT',
        key: 'app',
        children: [
            {
                label: 'Công ty tốt nhất',
                key: 'best companies',
                children: [
                    {
                        label: 'Công ty 1',
                        key: 'company 1'
                    },
                    {
                        label: 'Công ty 2',
                        key: 'company 2'
                    }
                ]
            },
            {
                label: 'Review công ty',
                key: 'review'
            }
        ]
    },
    {
        label: 'Blogs',
        key: 'SubMenu',
        children: [
            {
                label: 'Báo cáo lương IT',
                key: 'report',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                label: 'Sự nghiệp IT',
                key: 'career',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
            {
                label: 'Ứng tuyển và thăng tiến',
                key: 'apply',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:5',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:6',
                    },
                ],
            },
            {
                label: 'Chuyên môn IT',
                key: 'major',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:7',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:8',
                    },
                ],
            },
        ],
    },
];


const Header = () => {
    const [user, setUser] = useState<any>(null)

    const router = useRouter();

    // const verifyLogin = useQuery({
    //     queryKey: ['verify'],
    //     queryFn: async () => {
    //         const user = await http.getWithAutoRefreshToken('http://localhost:6868/api/users/me', { useAccessToken: true })
    //         setUser(user)
    //         return user
    //     }
    // })
    const handleLogout = async() => {
        await http.getWithAutoRefreshToken('/api/auth/logout',  {useAccessToken: true})
        sessionStorage.clear()
        localStorage.clear()
        setUser(null)
        router.push('/')
    }
    const content = (
        <div className='min-w-14 cursor-pointer'>
            <div className='py-2 ' onClick={() => router.push('/post')}>
                Tuyển dụng
            </div>
            <div className='py-2'>
                <button className='text-black' onClick={handleLogout} style={{ color: 'black' }}>
                    Đăng xuất
                </button>

            </div>
        </div>
    )

    const handleLoginClick = () => {
        router.push('/login');
    };
    const handleRegisterClick = () => {
        router.push('/signup');
    };

    return (
        <div className="header min-h-[88px] border-b border-b-gray-800 fixed z-10 top-0 left-0 right-0">
            <div className="container min-h-[88px] mx-auto flex items-center">
                <div onClick={() => router.push('/')} className='cursor-pointer'>
                    <p className="text-white text-3xl font-bold">Hust<span className="text-[#f0101a]">CV</span></p>
                </div>
                <div className='ml-48 flex-1'>
                    <div className='flex items-center gap-6 '>
                        <Menu className='bg-transparent min-w-[400px] text-xl text-[#a6a6a6]' mode="horizontal" items={items} />
                    </div>
                </div>
                {user ? (
                    <Popover content={content} style={{ width: 100 }} trigger="click" placement="bottom">
                        <div className='pr-28 cursor-pointer'><UserOutlined className='mr-4' />{user.username}<DownOutlined className='ml-4 opacity-70' /></div>
                    </Popover>
                ) : (
                    <div className='pr-14'>
                        <button className='text-[#a6a6a6] hover:text-white' onClick={handleLoginClick}>
                            Đăng nhập
                        </button>
                        <span className='text-[#a6a6a6] mx-2'>/</span>
                        <button className='text-[#a6a6a6] hover:text-white' onClick={handleRegisterClick}>
                            Đăng ký
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;