'use client'
import Image from 'next/image'
import type { MenuProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { Menu } from 'antd';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { useState } from 'react';

export default function Home() {
  const items: MenuProps['items'] = [
    {
      label: 'Tất cả thành phố',
      key: 'cities',
      children: [
        {
          label: 'Tất cả thành phố',
          key: 'all'
        },
        {
          label: 'Ho Chi Minh',
          key: 'hcm'
        },
        {
          label: 'Ha Noi',
          key: 'hn'
        },
        {
          label: 'Da Nang',
          key: 'dn'
        },
        {
          label: 'Khac',
          key: 'other'
        }
      ]
    },
  ]
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const [input, setInput] = useState('')

  const onSearch = () => {
    console.log(input)
  }

  return (
    <div className='h-[600px]'>
      <div className="search text-white pt-16 mt-[88px]">
        <div className="mx-80">
          <h2 className='text-3xl pb-8 font-bold'>773 Việc làm IT cho Developer "Chất"</h2>
          <div className="flex gap-4">
            <div className='w-[240px]'>
              <Menu className='rounded-sm' mode="horizontal" items={items} />
            </div>
            <div className='w-[526px]'>
              <input type="text" className='h-12 rounded-sm p-2 w-full' placeholder='Nhập từ khóa theo kỹ năng, chức vụ, công ty' />
            </div>
            <div>
              <button onClick={onSearch} className='bg-[#ed1b2f] w-[240px] h-12 rounded-sm font-semibold text-lg'><SearchOutlined className='p-2' /> Tìm kiếm</button>
            </div>
          </div>
          <div className='mt-8 flex items-center pb-16'>
            <p className='text-white mr-4'>Mọi người đang tìm kiếm:</p>
            <div className='inline-flex'>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Java</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>ReactJS</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>.NET</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Tester</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>PHP</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Business Analytic</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>NodeJS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
