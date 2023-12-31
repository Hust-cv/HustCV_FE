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
import { IPost } from '../shared/recruitmentPost.type';
import http from '../utils/http';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const Education = () => {
    const [isModalAddEduOpen,setModalAddEduOpen] = useState(false)
    const [isModalEditEduOpen, setModalEditEduOpen] = useState(false)
    const [isModalConfirmDeleteEduOpen, setModalConfirmDeleteEduOpen] = useState(false)
    const [disabledCheckboxEdu, setDisabledCheckboxEdu] = useState(false)
    const [deleteEdu, setDeleteEdu] = useState(null)
    const [editEdu, setEditEdu] = useState<any>({})

    const queryClient = useQueryClient()
    const education = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const userId = await localStorage.getItem('userId');
            try {
                const response = await http.postWithAutoRefreshToken('/api/profile/education/getAll', {personalFileId: userId}, { useAccessToken: true })
                return response
            } catch (error) {

            }
        }
    })

    const addNewEduMutation = useMutation({
        mutationFn: async (values: any) => {
            const userId = await localStorage.getItem('userId');
            values.start = values.start.toISOString();
            values.end = values.end.toISOString();
            const name = values.schools + '*/' + values.majors + '*/' + values.start + '*/' + (values.isStillStudy == true ? 'Hiện tại' : values.end)
            const data = await http.postWithAutoRefreshToken('/api/profile/education/add', {name: name, personalFileId: userId}, { useAccessToken: true })
            return data
        },
        onSuccess: (data, variables, context) => {
            message.success('Thêm học vấn thành công!')
            queryClient.invalidateQueries({ queryKey: ['education'] })
        },
        onError: (error: any) => {
            message.error(error.response.message)
        }
    })

    const deleteEduMutation = useMutation({
        mutationFn: async (id: any) => {
            const response = await http.deleteWithAutoRefreshToken('/api/profile/education/' + id, { useAccessToken: true })
            return response
        },
        onSuccess: (data, variables, context) => {
            message.success('Xóa học vấn thành công!')
            queryClient.invalidateQueries({ queryKey: ['education']})
        },
        onError: (error: any) => {
            message.error(error.response.message)
        }
    })

    const editEduMutation = useMutation({
        mutationFn: async ({ id, values }: any) => {
            values.start = values.start.toISOString();
            values.end = values.end.toISOString();
            const name = values.schools + '*/' + values.majors + '*/' + values.start + '*/' + (values.isStillStudy == true ? 'Hiện tại' : values.end)
            const response = await http.putWithAutoRefreshToken('/api/profile/education/' + id, {name: name}, { useAccessToken: true })
            return response
        },
        onSuccess: (data, variables, context) => {
            message.success('Cập nhật học vấn thành công!')
            queryClient.invalidateQueries({ queryKey: ['education']})
        },
        onError: (error: any) => {
            message.error(error.response.message)
        }
    })

    const showModalAddEdu = () => {
        setModalAddEduOpen(true);
    }
    const cancelModalAddEdu = () => {
        setModalAddEduOpen(false);
    }
    const onChangeCheckBoxEdu = (checked: any) => {
        // setDisabledCheckboxEdu((checked))
    }
    const finishAddEdu = (values: any) => {
        setModalAddEduOpen(false);
        addNewEduMutation.mutate(values);
    }

    const cancelModalConfirmDelete = () => {
        setDeleteEdu(null)
        setModalConfirmDeleteEduOpen(false);
    }

    const handleDeleteEdu = (idEdu: any) => {
        setDeleteEdu(idEdu)
        setModalConfirmDeleteEduOpen(true);
    }
    const finishDeleteEdu = () => {
        deleteEduMutation.mutate(deleteEdu);
        cancelModalConfirmDelete();
    }
    const cancelModalEditEdu = () => {
        setModalEditEduOpen(false);
    }

    const handleEditEdu = (infoEdu: any) => {
        setEditEdu(infoEdu);
        setModalEditEduOpen(true);
    }

    const finishEditEdu = (values: any) => {
        let id = editEdu.id
        editEduMutation.mutate({id, values});
        cancelModalEditEdu();
    }
    return(
        <>
            <div>
                <div>
                    <Modal title="Thêm học vấn"
                        open={isModalAddEduOpen}
                        onCancel={cancelModalAddEdu}
                        footer={null}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ isStillStudy: false }}
                            onFinish={finishAddEdu}
                        >
                            <Form.Item
                                label="Trường"
                                name="schools"
                                rules={[{ required: true, message: 'Vui lòng nhập tên trường của bạn!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Ngành học"
                                name="majors"
                                rules={[{ required: true, message: 'Vui lòng nhập tên ngành của bạn!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="isStillStudy"
                                valuePropName='checked'
                                wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Checkbox onChange={(e: any) => {onChangeCheckBoxEdu(e.target.checked)}} >Đang học</Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="Từ"
                                name="start"
                                rules={[{ required: true, message: 'Vui lòng chọn mốc thời gian'}]}
                            >
                                <DatePicker picker="month" />
                            </Form.Item>
                            <Form.Item
                                label="Đến"
                                name="end"
                                rules={[{ required: true, message: 'Vui lòng chọn mốc thời gian'}]}
                            >
                                <DatePicker picker="month" disabled={disabledCheckboxEdu} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" className='bg-blue-600'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Modal title="Chú ý" 
                        open={isModalConfirmDeleteEduOpen}
                        onCancel={cancelModalConfirmDelete}
                        footer={[
                            <Button onClick={finishDeleteEdu} type="primary" htmlType="submit" className='bg-red-600'>Xóa</Button>
                        ]}
                    >
                        <p>Bạn chắc chắn xóa ?</p>
                    </Modal>
                </div>
                <div>
                    {isModalEditEduOpen ? 
                    (<Modal
                        title="Sửa"
                        open={isModalEditEduOpen}
                        onCancel={cancelModalEditEdu}
                        footer={null}
                    >
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            onFinish={(values :any) => finishEditEdu(values)}
                        >
                            <Form.Item
                                label="Trường"
                                name="schools"
                                initialValue={editEdu?.name?.split('*/')[0]}
                                rules={[{ required: true, message: 'Vui lòng nhập tên trường của bạn!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Ngành học"
                                name="majors"
                                initialValue={editEdu?.name?.split('*/')[1]}
                                rules={[{ required: true, message: 'Vui lòng nhập tên ngành của bạn!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="isStillStudy"
                                valuePropName='checked'
                                initialValue={editEdu?.name?.split('*/')[3] == 'Hiện tại' ? true : false}
                                wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Checkbox onChange={(e: any) => onChangeCheckBoxEdu(e.target.checked)} >Đang học</Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="Từ"
                                name="start"
                                initialValue={moment(editEdu?.name?.split('*/')[2])}
                                rules={[{ required: true, message: 'Vui lòng chọn mốc thời gian'}]}
                            >
                                <DatePicker picker="month" />
                            </Form.Item>
                            <Form.Item
                                label="Đến"
                                name="end"
                                initialValue={moment(editEdu.name.split('*/')[3] != 'Hiện tại' ? editEdu.name.split('*/')[3] : false)}
                                rules={[{ required: true, message: 'Vui lòng chọn mốc thời gian'}]}
                            >
                                <DatePicker picker="month" disabled={disabledCheckboxEdu} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" className='bg-blue-600'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>) : ''}
                </div>
                <div>
                    <Card
                        title={
                            <>
                                <p className='font-bold text-3xl'>Học vấn</p>
                            </>
                        }
                        extra={
                            <>
                                <div className='mb-4 mt-2'>
                                    <a onClick={() => showModalAddEdu()}><PlusCircleOutlined className='mr-4 text-2xl' /></a>
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
                                            <p className='font-bold text-xl'>{info.name.split('*/')[0]}</p>
                                        </>
                                    }
                                    extra={
                                        <>
                                            <a onClick={() => handleEditEdu(info)}><EditOutlined className='mr-8' /></a>
                                            <a onClick={() => handleDeleteEdu(info.id)}><DeleteOutlined className='' /></a>
                                        </>
                                    }
                                >
                                    <p className='my-3 text-base'>{info.name.split('*/')[1]}</p>
                                    <p className='my-3 text-base'>{moment(info.name.split('*/')[2]).format('MM/YYYY') + ' - ' + (info.name.split('*/')[3] == 'Hiện tại' ? 'Hiện tại' : moment(info.name.split('*/')[3]).format('MM/YYYY')) }</p>
                                </Card>
                            )
                        })}
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Education