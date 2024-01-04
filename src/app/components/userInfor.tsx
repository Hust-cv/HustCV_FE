'use client'
import React, { useState } from 'react';
import Education from './education'
import Project from './project';
import { Descriptions } from 'antd';
import {
    Button,
    Modal,
    DatePicker,
    Form,
    Input,
    Checkbox,
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
import type { SelectProps, DatePickerProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../utils/http';
import moment from 'moment'
import { userInfo } from 'os';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const userInfor = () => {
    const [isModalEditInforOpen, setModalEditInforOpen] = useState(false)
    const [editInfor, setEditInfor] = useState<any>({})
    const queryClient = useQueryClient()
    const userInfor = useQuery({
        queryKey: ['userInfor'],
        queryFn: async () => {
            const userId = await localStorage.getItem('userId');
            try {
                const response = await http.postWithAutoRefreshToken('/api/profile/userInfor', {id: userId}, { useAccessToken: true });
                return response
            }
            catch (error){

            }
        }
    })
    const editInforMutation = useMutation({
        mutationFn: async ({id, values}: any) => {
            values.birth = values.birth.toISOString()
            const infor = values.name + '*/' + values.email + '*/' + values.birth + '*/' + values.phone + '*/' + values.gender;
            const response = await http.putWithAutoRefreshToken('api/profile/userInfor/' + id, {infor: infor}, { useAccessToken: true })
            return response;
        },
        onSuccess: (data, variables, context) => {
            message.success('Cập nhật thông tin thành công!');
            queryClient.invalidateQueries({ queryKey: ['userInfor']})
        },
        onError: (error: any) => {
            message.error(error.response.message)
        }
    })
    const showModalEditInfor = (infor: any) => {
        setEditInfor(infor)
        setModalEditInforOpen(true)
    }
    const cancelModalEditInfor = () => {
        setModalEditInforOpen(false)
    }
    const finishEditInfor = (values: any) => {
        let id = editInfor.id
        editInforMutation.mutate({id, values})
        cancelModalEditInfor()
    }
    return(
        <>
            <div key={'user-infor'}>
                <Card
                    title={
                        <>
                            <p className='font-bold text-3xl'>Thông tin</p>
                        </>
                    }
                    extra={
                        <>
                            <div className='mb-4 mt-2'>
                                <a onClick={() => showModalEditInfor(userInfor?.data)}><EditOutlined className='mr-4 text-2xl'/></a>
                            </div>
                        </>
                    }
                    className='w-full mb-4 border-black'
                >
                    <Descriptions column={2} contentStyle={{fontSize: 16}} labelStyle={{fontSize: 16}}>
                        <Descriptions.Item label="Họ tên">{userInfor?.data?.profile.split('*/')[0]}</Descriptions.Item>
                        <Descriptions.Item label="Email">{userInfor?.data?.profile.split('*/')[1]}</Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">{moment(userInfor?.data?.profile.split('*/')[2]).format('DD/MM/YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{userInfor?.data?.profile.split('*/')[3]}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{userInfor?.data?.profile.split('*/')[4]}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <div>
                    {isModalEditInforOpen ? 
                    (<Modal
                        title="Sửa"
                        open={isModalEditInforOpen}
                        onCancel={cancelModalEditInfor}
                        footer={null}
                    >
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            onFinish={(values :any) => finishEditInfor(values)}
                        >
                            <Form.Item
                                label="Họ tên"
                                name="name"
                                initialValue={editInfor?.profile?.split('*/')[0]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={editInfor?.profile?.split('*/')[1]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                initialValue={editInfor?.profile?.split('*/')[3]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Ngày sinh"
                                name="birth"
                                initialValue={moment(editInfor?.profile?.split('*/')[2])}

                            >
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                initialValue={editInfor?.profile?.split('*/')[4]}
                            >
                                    <Select
                                    style={{ width: 120 }}
                                    options={[
                                        { value: 'Nam', label: 'Nam' },
                                        { value: 'Nữ', label: 'Nữ' },
                                        { value: 'Khác', label: 'Khác' },
                                    ]}
                                    />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" className='bg-blue-600'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>) : ''}  
                </div>
            </div>
        </>
    )
}

export default userInfor