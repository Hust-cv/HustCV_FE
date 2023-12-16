'use client'
import React, { useState } from 'react';
import {
    Button,
    Modal,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    message,
    Card,
    Popover,
    Avatar,
    Tabs,
    TabsProps
} from 'antd';
import type { SelectProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { IPost } from '../shared/recruitmentPost.type';
import http from '../utils/http';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const candidateProfile = () => {


    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['recruitmentPosts'],
        queryFn: async () => {
            try {
                const response = await http.get('/api/profile/education')        //chỗ này cần sửa api cho bản thân
                return response.data
            } catch (error) {

            }
        }
    })

    const handleEdit = (post: any) => {

    }

    const handleDelete = (id: any) => {

    }

    const children1 = () => {
        return (
            <>
            </>
        )
    }

    return (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Profile',
              key: '1',
              children: children1()
            },
            {
              label: 'Manage CVs',
              key: '2',
              children: 'Tab 2',
            },
            {
              label: 'Job Pfeferences',
              key: '3',
              children: 'Tab 3',
            },
          ]}
        />
      );
}

export default candidateProfile