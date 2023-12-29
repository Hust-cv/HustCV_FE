'use client'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Descriptions } from 'antd';
import {
    Button,
    Modal,
    DatePicker,
    Form,
    Input,
    Select,
    message,
    Popover,
    Tabs,
    Upload,
    Card,
    TabsProps
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../utils/http';

const ManageCV = () => {
    const [fileList, setFileList] = useState<any>(null);
    const props = {
        beforeUpload: (file: any) => {
          setFileList(file);
          return false;
        },
        fileList,
      };
    const onFileUpload = () => {

    }
    return (
        <div>
            <Card>
                <p className='font-bold text-3xl mb-10'>Quản lý CV</p>
                <Upload>
                    <Button icon={<UploadOutlined />}>Choose PDF file</Button>
                </Upload>
                <Button type="primary" onClick={onFileUpload} className='bg-blue-600 mt-5'>
                    Upload
                </Button>
            </Card>
        </div>
      );
}

export default ManageCV