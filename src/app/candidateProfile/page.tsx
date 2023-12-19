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
import { MoreOutlined, CheckOutlined, FireOutlined, ReadOutlined, FormOutlined, TagOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined, MoneyCollectOutlined, FieldTimeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { SelectProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IPost } from '../shared/recruitmentPost.type';
import http from '../utils/http';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const candidateProfile = () => {
    const [isModalAddEducationOpen,setModalAddEducationOpen] = useState(false)
    const [isModalEditEducationOpen, setModalEditEducationOpen] = useState(false)
    const [deleteEducation, setDeleteEducation] = useState(null)

    const queryClient = useQueryClient()

    const education = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            try {
                const response = await http.get('/api/profile/education')        //chỗ này cần sửa api cho bản thân
                return response.data
            } catch (error) {

            }
        }
    })

    const addNewEducationMutation = useMutation({
        mutationFn: async (values: IPost) => {
            const data = await http.post('/api/profile', values)
            return data
        },
        onSuccess: (data, variables, context) => {
            message.success('Thêm học vấn thành công!')
            // setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['education'] })
        },
        onError: (error: any) => {
            message.error(error.response.data.message)
        }
    })

    const handleAddEducation = () => {

    }

    const handleEditEducation = (post: any) => {

    }

    const handleDeleteEducation = (id: any) => {

    }

    const profile1 = () => {
        return(
            <>
                <div className='mx-[300px]'>                           
                    <Card
                        title={
                            <>
                                <p className='font-bold text-3xl'>Education</p>
                            </>
                        }
                        extra={
                            <>
                                <div className='mb-4 mt-2'>
                                    <a onClick={() => handleAddEducation()}><PlusCircleOutlined className='mr-4 text-2xl' /></a>
                                </div>
                            </>
                        }
                        className='w-full mb-4 border-black'
                    >
                        {education?.data?.map((info: any) => {
                            return (
                                <Card
                                    key={info.id}
                                    title={
                                        <>
                                            <p className='font-bold text-lg'>{info.name.split('*/')[0]}</p>
                                        </>
                                    }
                                    extra={
                                        <>
                                            <div className='mb-4 mt-2'>
                                                <a onClick={() => handleEditEducation(info.id)}><EditOutlined className='mr-4' />Sửa</a>
                                            </div>
                                            <div>
                                                <a onClick={() => handleDeleteEducation(info.id)}><DeleteOutlined className='mr-4' />Xoá</a>
                                            </div>
                                        </>
                                    }
                                >
                                    <p className='my-3'>{info.name.split('*/')[1]}</p>
                                    <p className='my-3'>{info.name.split('*/')[2]}</p>
                                </Card>
                            )
                        })}
                    </Card>
                </div >
            </>
        )
    }

    const manageCv = () => {
        return(
            <>
            </>
        )
    }

    const jobPreferences = () => {
        return(
            <>
            </>
        )
    }

    return (
        <>
            <Tabs
                defaultActiveKey='1'
                size='large'
                tabBarStyle={{
                    marginRight: 50,
                    marginLeft: 50,
                }}
                tabBarGutter={50}
                items = {[
                    {
                        label: 'Profile',
                        key: '1',
                        children: profile1(),
                    },
                    {
                        label: 'Manage CVs',
                        key: '2',
                        children: manageCv()
                    },
                    {
                        label: 'Job Preferences',
                        key: '3',
                        children: jobPreferences()
                    },
                ]}
            />
        </>
    )
}

export default candidateProfile