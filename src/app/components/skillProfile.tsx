'use client'
import React, { useState } from 'react';
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
import { EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../utils/http';
import type { SelectProps, DatePickerProps } from 'antd';

const SkillProfile = () => {
    const [isModalEditSkillOpen, setModalEditSkillOpen] = useState(false)
    const queryClient = useQueryClient()

    const skillsResponse = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            try {
                const response = await http.getWithAutoRefreshToken('/api/skills/getAllSkills', { useAccessToken: true })
                return response
            } catch (error) {
                console.log(error)
            }
        }
    })
    const skillProfileResponse = useQuery({
        queryKey: ['skillProfile'],
        queryFn: async () => {
            try {
                const response = await http.getWithAutoRefreshToken('/api/profile/skill/getAll', { useAccessToken: true })
                return response
            }
            catch (error) {
                console.log(error)
            }
        }
    })
    const addNewSkillMutation = useMutation({
        mutationFn: async (values: any) => {
            const data = await http.postWithAutoRefreshToken('/api/profile/skill/add', {skill: values.skill}, { useAccessToken: true })
            return data
        },
        onSuccess: (data, variables, context) => {
            message.success('Thêm học vấn thành công!')
            queryClient.invalidateQueries({ queryKey: ['skillProfile'] })
        },
        onError: (error: any) => {
            message.error(error.response.message)
        }
    })
    const options: SelectProps['options'] = [];

    skillsResponse?.data?.map((skill: any) => {
        options.push({
            label: skill.name,
            value: skill.id,
        })
    })

    const handleEditSkill = () => {
        setModalEditSkillOpen(true)
    }
    const cancelModalEditSkill = () => {
        setModalEditSkillOpen(false)
    }
    const finishEditSkill = (values: any) => {
        addNewSkillMutation.mutate(values)
        cancelModalEditSkill();
    }
    return (
        <>
        <div>
            <div>
                {isModalEditSkillOpen ? 
                (<Modal
                    title="Sửa"
                    open={isModalEditSkillOpen}
                    onCancel={cancelModalEditSkill}
                    footer={null}
                >
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={(values :any) => finishEditSkill(values)}
                    >
                        <Form.Item
                            label="Kỹ năng"
                            name="skill"
                            initialValue={skillProfileResponse.data?.skills?.map((skill: any) => skill.name)}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Kỹ năng"
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className='bg-blue-600'>
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>) : ''}
            </div>
            <div>
                <Card
                    title={
                        <>
                            <p className='font-bold text-3xl'>Kỹ năng</p>
                        </>
                    }
                    extra={
                        <>
                            <div className='mb-4 mt-2'>
                                <a onClick={() => handleEditSkill()}><EditOutlined className='mr-4 text-2xl' style={{ color: 'blue' }} /></a>
                            </div>
                        </>
                    }
                    className='w-full mb-4 border-black'
                    style={{ border: '2px solid darkred' }}
                >
                    {skillProfileResponse?.data?.skills.map((info: any) => {
                        return (
                            <p className='ml-6 text-xl' key={info.id}>{info.name}</p>
                        )
                    })}
                </Card>
            </div>
            </div>
        </>
    )
}

export default SkillProfile